/**
 * Test for custom implementation of RSA public key encryption
 */
@isTest
private class RSAEncryptionTest {

    //Todo load from config or have test only one
    private static final String PUBLIC_KEY_STATIC_RESOURCE = CoreBankingAPI.API_RSA_ENCRYPTION_PEM_RESOURCE;

    @isTest
    static void testMissingCertificate() {
        String plainTextValue = 'ThisIsReallySensitiveInformation!';
        Boolean exceptionHandled = false;

        Test.startTest();
        try {
            RSAEncryption rsa = new RSAEncryption('thisdoesnotexist');
            String rsaEncryptedBase64 = rsa.encrypt(plainTextValue);
        } catch (RSAEncryption.RSAEncryptionException e) {
            exceptionHandled = true;
        }
        Test.stopTest();

        System.assert(exceptionHandled, 'Exception should be thrown and handled for missing certificate static resource');
    }
    
    @isTest
    static void testEncryptString() {
        String plainTextValue = 'ThisIsReallySensitiveInformation!';

        Test.startTest();
        RSAEncryption rsa = new RSAEncryption(PUBLIC_KEY_STATIC_RESOURCE);
        String rsaEncryptedBase64 = rsa.encrypt(plainTextValue);
        Test.stopTest();

        System.assert(String.isNotBlank(rsaEncryptedBase64), 'Encrypted contents should not be empty');
        System.assertNotEquals(plainTextValue, rsaEncryptedBase64, 'Plain text value did not get encrypted');
    }

    @isTest
    static void testEncryptBlob() {
        Blob secretKeyBytes = Crypto.generateAesKey(128); //generate random secret key
        String secretKeyBase64 = EncodingUtil.base64Encode(secretKeyBytes);

        Test.startTest();
        RSAEncryption rsa = new RSAEncryption(PUBLIC_KEY_STATIC_RESOURCE);
        String rsaEncryptedBase64 = rsa.encryptBlob(secretKeyBytes);
        Test.stopTest();

        System.assert(String.isNotBlank(rsaEncryptedBase64), 'Encrypted contents should not be empty');
        System.assertNotEquals(secretKeyBase64, rsaEncryptedBase64, 'Blob value did not get encrypted');
    }

    @isTest
    static void testHexToInt() {
        String hexStringTest = 'ff';
        Integer hexToBase10 = 255;

        Test.startTest();
        Integer intValue = RSAEncryption.hexToInt(hexStringTest);
        Test.stopTest();

        System.assertEquals(hexToBase10, intValue, 'Integer conversion not correct');
    }
}