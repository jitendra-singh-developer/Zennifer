/**
 * RSA Public Key encryption using PEM loaded from Static Resource
 */
public class RSAEncryption {

    public class RSAEncryptionException extends Exception {}

    public String thumbprint;

    private String modulus;
    private String exponent;

    // Hex Digits
    private static final String HEX_DIGITS = '0123456789abcdef';
    private static final List<String> HEX_DIGITS_LIST = HEX_DIGITS.split('');
    private static final Decimal HEX_BASE = 16;

    /**
     * @param certificateResourceName - Name of Static Resource of .pem file of RSA public key
     */
    public RsaEncryption(String certificateResourceName) {
        //Load public key from PEM for performing RSA encryption
        List<StaticResource> pemPublicKeyFile = [SELECT Body FROM StaticResource WHERE Name = :certificateResourceName];
        if (pemPublicKeyFile.isEmpty() || pemPublicKeyFile[0]?.Body == null) {
            throw new RSAEncryptionException('Failed to retrieve public key .pem file from Static Resource named "'+certificateResourceName+'"');
        }
        String publicKeyPem = pemPublicKeyFile[0].Body.toString();
        //System.debug('PEM Public Key: '+ publicKeyPem);

        Asn publicKeyAsn = new Asn(publicKeyPem);
        this.thumbprint = publicKeyAsn.thumbprint;
        Map<String,String> publicKeyParts = publicKeyAsn.extractPublicKeyComponents(publicKeyAsn.hex);

        // Base64 decode the PEM content to get the DER encoded byte array
        String modulus = publicKeyParts.get('modulus');
        String exponent = publicKeyParts.get('exponent');
        //System.debug('Modulus Hex: '+modulus);
        //System.debug('Exponent Hex: '+exponent);
        
        Blob modulusBlob = EncodingUtil.convertFromHex(modulus);
        Blob exponentBlob = EncodingUtil.convertFromHex(exponent);
        this.modulus = EncodingUtil.base64Encode(modulusBlob);
        this.exponent = EncodingUtil.base64Encode(exponentBlob);
        
        //System.debug('Modulus base64: '+this.modulus);
        //System.debug('Exponent base64: '+this.exponent);
    }

    /**
     * Perform RSA encryption on input string with PKCS 1 padding
     */
    public String encrypt(String input) {
        Blob mod = EncodingUtil.base64Decode(modulus);
        Blob exp = EncodingUtil.base64Decode(exponent);

        // Pad password.nonce
        Blob pn = Blob.valueOf(String.fromCharArray(pkcs1Pad2(input, mod.size() - 1)));

        Decimal modDec = hexToDecimal(EncodingUtil.convertToHex(mod));
        Decimal expDec = hexToDecimal(EncodingUtil.convertToHex(exp));
        Decimal pnDec = hexToDecimal(EncodingUtil.convertToHex(pn));

        // Calcluate padded^exp % mod and convert to hex
        Decimal result = modPow(pnDec, expDec, modDec);
        String hexResult = decimalToHex(result);
        // If length is uneven, add an extra 0
        if ((hexResult.length() & 1) == 1) {
            hexResult = '0' + hexResult;
        }

        // Generate the data to be encrypted.
        Blob encodedData = EncodingUtil.convertFromHex(hexResult);
        return EncodingUtil.base64Encode(encodedData);
    }

    /**
     * Perform RSA encryption on input Blob with PKCS 1 padding
     */
    public String encryptBlob(Blob input) {
        Blob mod = EncodingUtil.base64Decode(modulus);
        Blob exp = EncodingUtil.base64Decode(exponent);

        // Pad the input Blob
        Blob paddedBlob = pkcs1Pad2Blob(input, mod.size() - 1);

        Decimal modDec = hexToDecimal(EncodingUtil.convertToHex(mod));
        Decimal expDec = hexToDecimal(EncodingUtil.convertToHex(exp));
        Decimal inputDec = hexToDecimal(EncodingUtil.convertToHex(paddedBlob));

        // Calculate padded^exp % mod and convert to hex
        Decimal result = modPow(inputDec, expDec, modDec);
        String hexResult = decimalToHex(result);
        // If length is uneven, add an extra 0
        if ((hexResult.length() & 1) == 1) {
            hexResult = '0' + hexResult;
        }

        // Generate the data to be encrypted.
        Blob encodedData = EncodingUtil.convertFromHex(hexResult);
        return EncodingUtil.base64Encode(encodedData);
    }

    // Pad using PKCS#1 v.2. See https://en.wikipedia.org/wiki/PKCS_1
    // s = String to pad
    // n = bytes to fill must be bigger than s.length()
    private static List<integer> pkcs1Pad2(String s, integer n) {
        // Byte array
        List<integer> ba = new List<integer>();
        // Fill array with zeros to get the right size
        for(integer i = 0; i < n; i++) {
            ba.add(0);
        }
        integer i = s.length() - 1;
        while(i >= 0 && n > 0) {
            ba.set(--n, s.charAt(i--));
        }
        ba.set(--n, 0);
        while(n > 2) { // random non-zero pad
            // Since the array is converted to a string, choose integers that corresponds
            // to a proper char code see http://www.asciitable.com
            integer rnd = Math.round(Math.random() * (127 - 32) + 32);
            ba.set(--n, rnd);
        }
        ba.set(--n, 2);
        ba.set(--n, 0);
        return ba;
    }

    // Pad using PKCS#1 v.2 for Blobs
    public Blob pkcs1Pad2Blob(Blob data, Integer keySize) {
        Integer dataLength = data.size();
        Integer paddingSize = keySize - dataLength - 3;

        if (dataLength + 11 > keySize) {
            throw new RSAEncryptionException('Data is too large to encrypt');
        }

        // Start with the padding pattern 0x00 0x02
        String paddedString = '0002';

        // Generate padding bytes and append to the paddedString
        while (paddingSize > 0) {
            Integer paddingByte = Math.mod(Math.abs(Crypto.getRandomInteger()), 255) + 1;
            String hexByte = decimalToHex(paddingByte);
            paddedString += hexByte.length() == 1 ? '0' + hexByte : hexByte; // Prepend '0' if needed
            paddingSize--;
        }

        // Append a separator byte 0x00 to the paddedString
        paddedString += '00';

        // Convert the input data Blob to a hexadecimal string and append to the paddedString
        String dataHex = EncodingUtil.convertToHex(data);
        paddedString += dataHex;

        // Convert the final paddedString back to a Blob
        Blob paddedBlob = EncodingUtil.convertFromHex(paddedString);

        return paddedBlob;
    }

    /**
     * Mathematecal helpers to perform encryption calculations
     */
    
    // base^exp % mod
    private static Decimal modPow(Decimal base, Decimal exp, Decimal mod) {
        if (base < 1 || exp < 0 || mod < 1) {
            return -1;
        }

        Decimal result = 1;
        while (exp > 0) {
           if ((exp.longValue() & 1) == 1) {
               result = modulus((result * base), mod);
           }
           base = modulus((base * base), mod);
           exp = exp.divide(2, 0, RoundingMode.FLOOR);
        }
        return result;
    }

    // dividend % divisor
    private static Decimal modulus(Decimal dividend, Decimal divisor) {
        Decimal d = dividend.divide(divisor, 0, RoundingMode.FLOOR);
        return dividend - (d * divisor);
    }

    @TestVisible
    private static Integer hexToInt(String str) {
        str = str.toLowerCase();
        String[] hexValue = str.split('');
        Integer retVal = 0;
        for(Integer i = 0; i < hexValue.size(); i++) {
            retVal = (retVal << 4) + HEX_DIGITS_LIST.indexOf(hexValue[i]);
        }
        return retVal;
    }

    private static Decimal hexToDecimal(String hex) {
        Decimal result = 0;
        integer length = hex.length();
        integer i = 0;
        while(i < length) {
            integer hexByte = HEX_DIGITS.indexOf(hex.substring(i, i + 1).toLowerCase());
            i++;
            result += hexByte * HEX_BASE.pow(length - i);
        }
        return result;
    }

    private static String decimalToHex(Decimal d) {
        if (d == 0) {
            return '00'; // Return "00" if the decimal is 0
        }
        String hex = '';
        while (d > 0) {
            Integer digit = Integer.valueOf(modulus(d, HEX_BASE)); // rightmost digit
            hex = HEX_DIGITS.substring(digit, digit + 1) + hex; // string concatenation
            d = d.divide(HEX_BASE, 0, RoundingMode.FLOOR);
        }
        // Ensure the hex string has two characters for single digit hex values
        return Math.Mod(hex.length(),2) == 1 ? '0' + hex : hex;
    }
    
    /**
     * ASN DER parser
     */
    public class Asn
    {
        /**
         * Hexadecimal string of ASN.1 DER encoded data
         */
        String hex;
        /**
         * SHA-1 hash of public key DER encoding
         */
        String thumbprint;
        
        /**
         * PEM file constructor
         * https://en.wikipedia.org/wiki/Privacy-Enhanced_Mail
         * Format must be consistent with the following example:
         * 
         * -----BEGIN PUBLIC KEY-----\n
         * MIIEpAIBAAKCAQEAy5REcVYFbh8wwC9\n
         * 7qkKp1cm8Zx+FzukKBodOgg87mevD5Y\n
         * W2+T12o+f7WEf53Sp6W51p3/4Q1DyPl\n
         * KNHRodQEjx8DAAYvYagiE3/zgkYzC2I\n
         * -----END PUBLIC KEY-----
         */
        public Asn(String pemFile)
        {
            pemFile = pemFile.trim();
            String ends = '-----END PUBLIC KEY-----';
            String begins = '-----BEGIN PUBLIC KEY-----';
            if (!pemFile.startsWith(begins)) throw new StringException('PEM file must start with ' + begins);
            if (!pemFile.endsWith(ends)) throw new StringException('PEM file must terminate with ' + ends);
            
            String base64 = pemFile.substringBetween(begins, ends).deleteWhitespace();
            Blob derEncoding = EncodingUtil.base64Decode(base64);
            this.hex = EncodingUtil.convertToHex(derEncoding);
            this.thumbprint = EncodingUtil.convertToHex(Crypto.generateDigest('SHA-1', derEncoding));
            //System.debug('RSA Public Key Hex: '+ this.hex);
            //System.debug('RSA Public Key Thumbprint (SHA-1): '+ this.thumbprint);
        }
        
        /**
         * An RSA public key should be represented with the ASN.1 type RSAPublicKey:
         * https://tools.ietf.org/html/rfc3447#appendix-A.1.2
         * 
         * SubjectPublicKeyInfo  ::=  SEQUENCE  {
         *      algorithm            AlgorithmIdentifier,
         *      subjectPublicKey     BIT STRING  }
         *      
         *  AlgorithmIdentifier  ::=  SEQUENCE  {
         *      algorithm            OBJECT IDENTIFIER,
         *      parameters           ANY DEFINED BY algorithm OPTIONAL  }
         *      
         *  RSAPublicKey ::= SEQUENCE {
         *      modulus           INTEGER,  -- n
         *      publicExponent    INTEGER   -- e
         *  }
         * 
         */
        /*public Asn(Blob asn1data)
        {
            this.hex = EncodingUtil.convertToHex(asn1data);
            if (this.hex.contains('2d2d2d2d2d'))
            throw new StringException('Use PEM file constructor. ASN.1 data cannot include "-----"');
        }*/
        
        /**
         * Extracts the modulus and public exponent from the ASN.1 DER-encoded data.
         */
        /*public Map<String, Blob> extractPublicKeyComponents() {
            Map<String, Blob> components = new Map<String, Blob>();
            List<Integer> indexes = this.indexes();
    
            // Assuming index 0 is the modulus and index 1 is the public exponent
            Blob modulus = this.value(indexes[0]);
            Blob publicExponent = this.value(indexes[1]);
    
            components.put('modulus', modulus);
            components.put('exponent', publicExponent);
            return components;
        }*/

        /**
         * Extracts the modulus and public exponent from the ASN.1 DER-encoded data.
         */
        public Map<String, String> extractPublicKeyComponents(String rsaPubKeyHex) {
            // Initialize the map to store modulus and exponent
            Map<String, String> keyComponents = new Map<String, String>();
            
            String asnHeaderHex = '300d06092a864886f70d0101010500';
            Integer indexOfAsnHeader = rsaPubKeyHex.indexOf(asnHeaderHex);
            String asnData = rsaPubKeyHex.substring(indexOfAsnHeader+asnHeaderHex.length(),rsaPubKeyHex.length());
            
            // Extract the modulus hex value
            String modulusLengthHex = '0203';
            String exponentHex = asnData.substring(asnData.lastIndexOf(modulusLengthHex)+modulusLengthHex.length());
            Integer modulusIndex = asnData.indexOf('0282010100') > -1 ? asnData.indexOf('02820101')+8 : asnData.indexOf('00');
            String modulusHex = asnData.substring(modulusIndex,asnData.lastIndexOf(modulusLengthHex));
            
            // Store modulus and exponent in the map
            keyComponents.put('modulus', modulusHex);
            keyComponents.put('exponent', exponentHex);
    
            return keyComponents;
        }
        
        /**
         * Integer list of indexes for ASN.1
         * objects appearing in hex string
         */
        /*public List<Integer> indexes()
        {
            Integer start = getVindex(0);
            List<Integer> indexes = new List<Integer>();
            if (this.hex.substring(0, 2) == '03') indexes.add(start + 2);
            else indexes.add(start);
            Integer max = 0;
            Integer curr = start;
            Integer length = getVblen(0);
            while (true)
            {
                Integer next = getNextSiblingIndex(curr);
                if (next == null || (next - start >= (length * 2))) break;
                if (max >= 200) break;
                indexes.add(next);
                curr = next;
                max++;
            }
            return indexes;
        }*/
        
        /**
         * All data (eg primes/coefficient)
         * appearing in the DER structure
         */
        /*public List<Blob> values()
        {
            List<Blob> values = new List<Blob>();
            for (Integer index : this.indexes()) values.add(value(index));
            return values;
        }*/
        
        /**
         * Data value for object
         * according to index
         */
        /*Blob value(Integer index)
        {
            Integer start = getVindex(index);
            Integer length = getVblen(index);
            String hex = this.hex.substring(start, start + length * 2);
            return EncodingUtil.convertFromHex(hex);
        }*/
        
        /**
         * Starting index of next
         * sibling in ASN.1 hex string
         */
        /*Integer getNextSiblingIndex(Integer index)
        {
            Integer start = getVindex(index);
            Integer length = getVblen(index);
            return start + length * 2;
        }*/
        
        /**
         * Value start position in ASN.1 hex 
         * for object according to index
         */
        /*Integer getVindex(Integer index)
        {
            Integer length = getLblen(index);
            if (length < 0) return length;
            return index + (length + 1) * 2;
        }*/
        
        /**
         * Byte length of item
         * in ASN.1 hex string
         */
        /*Integer getLblen(Integer index)
        {
            if (this.hex.substring(index + 2, index + 3) != '8') return 1;
            Integer i = Integer.valueOf(this.hex.substring(index + 3, index + 4));
            if (i == 0) return -1; // length octet '80' indefinite length
            if (0 < i && i < 10) return i + 1; // including '8?' octet;
            return -2; // malformed format
        }*/
        
        /**
         * Hex string for item
         * according to index
         */
        /*String getL(Integer index)
        {
            Integer length = getLblen(index);
            if (length < 1) return '';
            return this.hex.substring(index + 2, index + 2 + (length * 2));
        }*/
        
        /**
         * Length of binary data for
         * item according to index
         */
        /*Integer getVblen(Integer index)
        {
            String hex = this.getL(index);
            if (hex == '') return -1;
            if (hex.substring(0, 1) == '8') return hexToDec(hex.substring(2, hex.length()));
            return hexToDec(hex);
        }*/
        
        /**
         * Hexadecimal converter by Brian Fear @sfdcfox
         * https://salesforce.stackexchange.com/a/127545
         */
        /*Integer hexToDec(String hex) {
            Integer dec = 0;
            List<String> chars = hex.toLowerCase().split('');
            for (Integer i = 0, size = chars.size(); i < size; i++)
            dec = (dec << 4) + HEX_DIGITS_LIST.indexOf(chars[i]);
            if (dec < 0) throw new MathException('Overflow: ' + hex);
            return dec;
        }*/
    }
}