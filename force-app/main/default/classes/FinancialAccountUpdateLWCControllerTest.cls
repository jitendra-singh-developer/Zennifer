@isTest
public class FinancialAccountUpdateLWCControllerTest {
    @isTest
    static void testCalloutRecordUpdate_Success() {
        // Create a test Account
        Account testAccount = new Account(
            Name = 'Test Account',
            FinServ__SourceSystemId__c = 'TestSourceId'
        );
        insert testAccount;
		
		FinServ__FinancialAccount__c testFinAcc = new FinServ__FinancialAccount__c (
		FinServ__FinancialAccountNumber__c = '12345678',
		FinServ__PrimaryOwner__c = testAccount.Id
        );
		Insert testFinAcc;
		
        FinancialAccountAPIConfig__c  config = new FinancialAccountAPIConfig__c (
            Endpoint_URL__c = 'https://test.api.org/',
            X_Correlation_Id__c = 'test'
        );
        insert config;

        // Set up the mock HTTP response
        Test.setMock(HttpCalloutMock.class, new MockHttpResponse());

        // Start a new test transaction
        Test.startTest();

        // Call the LWC controller method
        FinancialAccountUpdateLWCController.ResultWrapper result = FinancialAccountUpdateLWCController.calloutRecordUpdate(testAccount.Id);

        // Verify that the result indicates success
        System.assertEquals(true, result.isSuccess);
        System.assertEquals(null, result.error);

        // Stop the test transaction
        Test.stopTest();
    }
	
	@isTest
    static void testCalloutRecordUpdateFinAcc_Success() {
        // Create a test Account
        Account testAccount = new Account(
            Name = 'Test Account',
            FinServ__SourceSystemId__c = 'TestSourceId'
        );
        insert testAccount;
		
		FinServ__FinancialAccount__c testFinAcc = new FinServ__FinancialAccount__c (
		FinServ__FinancialAccountNumber__c = '12345678',
		FinServ__PrimaryOwner__c = testAccount.Id,
		Account_Type__c = 'DDA'
        );
		Insert testFinAcc;
		
        FinancialAccountAPIConfig__c  config = new FinancialAccountAPIConfig__c (
            Endpoint_URL__c = 'https://test.api.org/',
            X_Correlation_Id__c = 'test'
        );
        insert config;

        // Set up the mock HTTP response
        Test.setMock(HttpCalloutMock.class, new MockHttpFinAccResponse());

        // Start a new test transaction
        Test.startTest();

        // Call the LWC controller method
        FinancialAccountUpdateLWCController.ResultWrapper result = FinancialAccountUpdateLWCController.calloutRecordUpdate(testFinAcc.Id);

        // Verify that the result indicates success
        System.assertEquals(true, result.isSuccess);
        System.assertEquals(null, result.error);

        // Stop the test transaction
        Test.stopTest();
    }

    @isTest
    static void testCalloutRecordUpdate_Failure() {
        // Create a test Account
        Account testAccount = new Account(
            Name = 'Test Account',
            FinServ__SourceSystemId__c = 'TestSourceId'
        );
        insert testAccount;
		
		FinancialAccountAPIConfig__c  config = new FinancialAccountAPIConfig__c (
            Endpoint_URL__c = 'https://test.api.org/',
            X_Correlation_Id__c = 'test'
        );
        insert config;


        // Set up the mock HTTP response with an error
        Test.setMock(HttpCalloutMock.class, new MockHttpErrorResponse());

        // Start a new test transaction
        Test.startTest();

        // Call the LWC controller method
        FinancialAccountUpdateLWCController.ResultWrapper result = FinancialAccountUpdateLWCController.calloutRecordUpdate(testAccount.Id);

        // Verify that the result indicates failure and contains the error message
        System.assertEquals(false, result.isSuccess);
        System.assertNotEquals(null, result.error);

        // Stop the test transaction
        Test.stopTest();
    }

    // Mock HTTP response with sample JSON data
    public class MockHttpResponse implements HttpCalloutMock {
        public HTTPResponse respond(HTTPRequest req) {
            HttpResponse res = new HttpResponse();
            res.setStatusCode(200);
            res.setBody('{"total":1,"results":[{"financialAccount":{"accountNumber":"12345678","balances":[{"sourceType":"Ledger","amount":{"amount":109.45}},{"sourceType":"Principal","amount":{"amount":109.45}},{"sourceType":"Current","amount":{"amount":109.45}},{"sourceType":"Hold","amount":{"amount":0.00}},{"sourceType":"Ledger","amount":{"amount":123.45}},{"sourceType":"InterestAccrued","amount":{"amount":0.00}},{"sourceType":"InterestDue","amount":{"amount":0.00}}],"status":{"status":"Active"}}}]}');
            return res;
        }
    }
	
	// Mock HTTP response with sample FinAcc JSON data
    public class MockHttpFinAccResponse implements HttpCalloutMock {
        public HTTPResponse respond(HTTPRequest req) {
            HttpResponse res = new HttpResponse();
            res.setStatusCode(200);
            res.setBody('{ "balances": [ { "sourceType": "Principal", "amount": { "amount": 0.00, "currency": { "code": "ISO4217-Alpha", "value": "USD" } } }, { "sourceType": "Current", "amount": { "amount": 7.35, "currency": { "code": "ISO4217-Alpha", "value": "USD" } } }, { "sourceType": "Ledger", "amount": { "amount": 7.35, "currency": { "code": "ISO4217-Alpha", "value": "USD" } } } ] }');
            return res;
        }
    }

    // Mock HTTP response with an error
    public class MockHttpErrorResponse implements HttpCalloutMock {
        public HTTPResponse respond(HTTPRequest req) {
            HttpResponse res = new HttpResponse();
            res.setStatusCode(400);
            res.setBody('{"success": false, "errorDetails": [{"code": 400, "reason": "CLIENT:BAD_REQUEST", "message": "The requested resource <<>> on the URL was not found."}]}');
            return res;
        } 
    } 
}