@isTest
private class VerificationLogTest {
    
    private static testMethod void testCreateSingleLogEntry() {
        
        Verification_Log__c testVerificationLog = createTestVerificationLog();
		insert testVerificationLog;

		id_verification.Verifier testVerifier = createTestVerifier('testDeveloperName', 'true');

		Test.startTest();
		Verification_Log_Detail__c testVerificationLogDetail = VerificationLog.createLogEntry(testVerificationLog.Id, testVerifier, true);
        insert testVerificationLogDetail;
        Test.stopTest();
        
        System.assertEquals(testVerificationLog.Id, testVerificationLogDetail.Verification_Log__c);
        System.assertEquals(testVerificationLogDetail.Answered_Correctly__c, true);
        System.assertEquals(testVerificationLogDetail.Required__c, true);
        System.assertEquals(testVerificationLogDetail.Field__c, 'testDeveloperName');
    }
    
    private static testMethod void testCreateMultipleLogEntry() {
        
        Verification_Log__c testVerificationLog = createTestVerificationLog();
		insert testVerificationLog;
        
        List<id_verification.Verifier> testVerifierList = new List<id_verification.Verifier>();
        for (integer i = 0; i < 5; i++) {
            id_verification.Verifier testVerifier = createTestVerifier('testDeveloperName' + i, 'false');
            testVerifierList.add(testVerifier);
        }
        
        Test.startTest();
        
        List<Verification_Log_Detail__c> testVerificationLogDetailList = new List<Verification_Log_Detail__c>();
        
        for (integer i = 0; i < 5; i++) {
            Verification_Log_Detail__c testVerificationLogDetail = VerificationLog.createLogEntry(testVerificationLog.Id, testVerifierList[i], true);
            testVerificationLogDetailList.add(testVerificationLogDetail);
        }
        
        insert testVerificationLogDetailList;
        
        Test.stopTest();
        
        System.assertEquals([SELECT COUNT() FROM Verification_Log_Detail__c WHERE Verification_Log__c = :testVerificationLog.Id], 5);
        
    }
    
    private static testMethod void testCreateVerificationLog() {
        
        FinServ__UsePersonAccount__c personAccountConfig = new FinServ__UsePersonAccount__c();
        personAccountConfig.Name = 'Use Person Account';
        personAccountConfig.FinServ__Enable__c = true;
        insert personAccountConfig;
        
        Account testAccount = new Account();
        testAccount.FirstName = 'Test';
        testAccount.LastName = 'Person';
        testAccount.RecordTypeId = Schema.SObjectType.Account.getRecordTypeInfosByDeveloperName().get('PersonAccount').getRecordTypeId();
        insert testAccount;
        
        List<id_verification.FieldValue> testSelectedRecordObject = new List<id_verification.FieldValue>();
        id_verification.FieldValue testFieldValue = new id_verification.FieldValue('Name', testAccount.Name);
        testSelectedRecordObject.add(testFieldValue);
        
        List<id_verification.VerifiedResult> testVerifiedResult = new List<id_verification.VerifiedResult>();
        
        List<id_verification.Verifier> testRequiredVerifiers = new List<id_verification.Verifier>();
        id_verification.Verifier testRequired = createTestVerifier('Name', 'true');
        testRequiredVerifiers.add(testRequired);        
        
        List<id_verification.Verifier> testOptionalVerifiers = new List<id_verification.Verifier>();
        id_verification.Verifier testOptional = createTestVerifier('BillingAddress', 'true');
        testOptionalVerifiers.add(testOptional);
        
        id_verification.VerifiedResult testVerified = createTestVerifiedResult(testRequiredVerifiers, testOptionalVerifiers);
        testVerifiedResult.add(testVerified);
        
        List<id_verification.SelectedSearchResult> testSelectedSearchResult = new List<id_verification.SelectedSearchResult>();
        id_verification.SelectedSearchResult testSelectedSearch = createTestSelectedSearchResult((String)testAccount.Id, 'Account', testSelectedRecordObject);
        testSelectedSearchResult.add(testSelectedSearch);
        
        VerificationLog.VerificationLogRequest testRequest = createTestVerificationLogRequest(testVerifiedResult, testSelectedSearchResult);
        List<VerificationLog.VerificationLogRequest> testVerificationLogRequests = new List<VerificationLog.VerificationLogRequest>();
        testVerificationLogRequests.add(testRequest);
        Test.startTest();
        VerificationLog.createVerificationLog(testVerificationLogRequests);
        Test.stopTest();
        
        System.assertEquals([SELECT COUNT() FROM Verification_Log__c WHERE Account__c = :testAccount.Id], 1);
        
        Verification_Log__c verificationLog = [
            SELECT Id, Name, Account__c
            FROM Verification_Log__c
            WHERE Account__c = :testAccount.Id
        ];
        
        System.assertEquals([SELECT COUNT() FROM Verification_Log_Detail__c WHERE Verification_Log__c = :verificationLog.Id], 2);
        
    }
    
    private static Verification_Log__c createTestVerificationLog() {
        Verification_Log__c testVerificationLog = new Verification_Log__c();
        testVerificationLog.Date_of_Interaction__c = System.Datetime.now();
        return testVerificationLog;
    }
    
    private static VerificationLog.VerificationLogRequest createTestVerificationLogRequest(
        List<id_verification.VerifiedResult> testVerifiedResult, 
        List<id_verification.SelectedSearchResult> testSelectedSearchResult) {
                
        	VerificationLog.VerificationLogRequest testRequest = new VerificationLog.VerificationLogRequest();
        	testRequest.verifiedResult = testVerifiedResult[0];
            testRequest.selectedSearchResult = testSelectedSearchResult[0];
            
            return testRequest;
    }
    
    private static id_verification.VerifiedResult createTestVerifiedResult(List<id_verification.Verifier> required, List<id_verification.Verifier> optional) {
        return new id_verification.VerifiedResult(required, optional);     
    }
    
    private static id_verification.Verifier createTestVerifier(String developerName, String verificationState){
        return new id_verification.Verifier(developerName, verificationState);
    }
    
    private static id_verification.SelectedSearchResult createTestSelectedSearchResult(String recordId, String objectName, List<id_verification.FieldValue> selectedRecordObject) {
        return new id_verification.SelectedSearchResult(recordId, objectName, selectedRecordObject);
    }

}