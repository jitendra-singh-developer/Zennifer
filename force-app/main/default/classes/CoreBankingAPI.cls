/**
 * API Helper for performing callouts to Banc of California Azure API gateway to core banking
 * data from FIS IBS.
 * 
 * This class implements BOC security policies for encrypting request values 
 * and passing custom headers required by the API.
 **/
global inherited sharing class CoreBankingAPI implements apiutil.ApiRequestInterceptor, omnistudio.VlocityOpenInterface {
    private static final Boolean IS_SANDBOX = [SELECT IsSandbox FROM Organization][0].IsSandbox;
    private static final String CONFIG_PREFIX = IS_SANDBOX ? 'SB_' : '';
    
    // Load environment configuraton from custom metadata
    public static final String API_RSA_ENCRYPTION_PEM_RESOURCE = API_Configuration__mdt.getInstance(CONFIG_PREFIX+'CORE_API_RSA_ENCRYPTION_PEM_RESOURCE')?.Value__c;
    public static final String API_X509_CERTIFICATE_THUMBPRINT = API_Configuration__mdt.getInstance(CONFIG_PREFIX+'CORE_API_X509_CERTIFICATE_THUMBPRINT')?.Value__c; //openssl x509 -in <name of cert>.cer -pubout -outform DER | openssl sha1
    
    /**
     * Method to enable OmniStudio (Data Integration Procedure) to encrypt value into required parts for an HTTP request
     */
    global Boolean invokeMethod(String methodName, Map<String,Object> inputMap, Map<String,Object> outMap, Map<String,Object> options) {            
        Boolean result = true;
        if(methodName.equals('encrypt') && inputMap.get('value') instanceOf String) {
            String plainTextValue = String.valueOf(inputMap.get('value'));
            EncryptedValue encryptedData = new EncryptedValue(plainTextValue);
            outMap.put('key', encryptedData.key);
            outMap.put('value', encryptedData.value);
            outMap.put('hash', encryptedData.hash);
            outMap.put('uuid', UUID.randomUUID().toString());
        }
        return result;
    }

    /**
     * Method for API Utility to generate and set required encryption and request headers
     * 1. Encryption of sensitive value in URI path represented by 'encrypt()' syntax
     * 2. X-Api-Encryption-Key header - RSA encrypted secret key used for encryption
     * 3. X-Api-Encryption-Hash header - SHA-256 base64 hash of the encrypted value and cert thumbprint
     * 4. X-Correlation-Id header - UUID generated for the request
     */
    public HttpRequest transformRequest(HttpRequest req) {
        //Get value to encrypt in URI with designated syntax
        String valueToEncrypt = req.getEndpoint().replaceAll('.*encrypt\\((.*)\\).*', '$1');
        // Rebuild the endpoint with the encrypted parts
        EncryptedValue encryptedData = new EncryptedValue(valueToEncrypt);
        req.setEndpoint(req.getEndpoint().replaceAll('(.*)(encrypt\\(.*\\))(.*)', '$1'+encryptedData.value+'$3'));
        // Populate encryption headers
        req.setHeader('X-Api-Encryption-Key', encryptedData.key);
        req.setHeader('X-Api-Encryption-Hash', encryptedData.hash);
        String requestId = UUID.randomUUID().toString();
        req.setHeader('X-Correlation-Id', requestId);

        System.debug('Sending Request UUID: '+requestId);
        //System.debug('Encryption Debug: '+JSON.serialize(encryptedData));
        return req;
    }

    /**
     * Financial Account Transactions
     * Custom data transformations to simplify raw API response for easier API Utility mapping
     */
    global class TransactionsResponseTransformer implements apiutil.ApiResponseInterceptor {
        /**
         * Called by API Utility prior to display/sync
         */
        public HttpResponse transformResponse(HttpResponse res) {
            //get mutable object from json string
            Object responseObj = JSON.deserializeUntyped(res.getBody());
            if (responseObj instanceOf Map<String,Object>) {
                Map<String,Object> responseMap = (Map<String,Object>)responseObj;
                //transform list data using OmniStudio Data Integration Procedure
                responseMap = (Map<String, Object>) omnistudio.IntegrationProcedureService.runIntegrationService(
                    'CoreBankingAPI_TransactionsResponseTransformer', 
                    responseMap, 
                    null
                );
                //set new response data
                res.setBody(JSON.serialize(responseMap));
            }
            return res;
        }
    }
    
    /**
     * This class encrypts a plain text value into the following three parts:
     * @param value - AES-128 CBC encrypted value with generated 128-bit IV and key: "<urlSafeBae64(iv)>.<urlSafeBae64(encrypted)>"
     * @param hash - SHA-256 hash, base64 encoded, of encrypted value and x509 certificate SHA-1 thumbprint : "base64(sha256(<value>.<thumbprint>))"
     * @param key - Encrypted secret key using RSA 2048-bit PKCS1
     **/
    private class EncryptedValue {
        private String key;
        private String value;
        private String hash;
        
        public EncryptedValue(String plainTextValue) {
            encrypt(plainTextValue, API_RSA_ENCRYPTION_PEM_RESOURCE);
        }

        private void encrypt(String plainTextValue, String certificateName) {
            // Generate an AES key
            Blob secretKeyBytes = Crypto.generateAesKey(128);
            String secretKeyBase64 = EncodingUtil.base64Encode(secretKeyBytes);
            //System.debug('Generated AES Secret Key (Base64): '+secretKeyBase64);

            // Encrypt the clear text value using AES key with generated IV
            Blob iv = Crypto.generateAesKey(128);
            Blob encryptedData = Crypto.encrypt('AES128', secretKeyBytes, iv, Blob.valueOf(plainTextValue));
            //Adjustments to remove base64 padding and URL safe characters
            String ivEncoded = urlSafeBase64(EncodingUtil.base64Encode(iv));
            String encryptedDataEncoded = urlSafeBase64(EncodingUtil.base64Encode(encryptedData));
            //set required format of <encoded initialization vector>.<encoded encrypted value>
            this.value = ivEncoded + '.' + encryptedDataEncoded;

            // Generate SHA-256 hash of the encrypted value with public key cert thumbprint
            Blob encryptedValueHashBlob = Crypto.generateDigest('SHA-256', Blob.valueOf(this.value + '.' + API_X509_CERTIFICATE_THUMBPRINT));
            // Required format is base64 of the hash bytes
            this.hash = EncodingUtil.base64Encode(encryptedValueHashBlob);
            
            // RSA Encrypt the AES secret key for sharing to API server
            RSAEncryption rsa = new RSAEncryption(certificateName);
            this.key = rsa.encryptBlob(secretKeyBytes);
        }

        //adjustments to remove base64 padding and URL safe characters 
        //(i.e. Java Base64.getUrlEncoder().withoutPadding().encodeToString(encrypted))
        private String urlSafeBase64(String base64Content) {
            return base64Content.replaceAll('=+$', '').replaceAll('\\+', '-').replaceAll('/', '_');
        }
    }
}