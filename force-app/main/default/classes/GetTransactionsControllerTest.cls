@isTest
public class GetTransactionsControllerTest {
    
    @TestSetup 
    private static void setupTestData()
    {
        Account primaryOwnerAccount = new Account(
            Name = 'Primary Owner Account'
        );
        insert primaryOwnerAccount;
        
        FinServ__FinancialAccount__c financialAccount = new FinServ__FinancialAccount__c(
            FinServ__FinancialAccountNumber__c = '180819',
            FinServ__PrimaryOwner__c = primaryOwnerAccount.Id,
            FinServ__FinancialAccountType__c = '0014'
        );        
        insert financialAccount;
        
        ActionCode_Mapping__c mapping = new ActionCode_Mapping__c(
            Action_Code__c = 'P',
            Name = 'Loan Payment'
        );
        insert mapping;
        
        ShareTransactionsConfig__c config = new ShareTransactionsConfig__c(
            Endpoint_URL__c  = 'test@example.com',
            Client_ID__c  = '123',
            Client_Secret__c = '456'
        );
        insert config;
    }   
       
    @isTest
    public static void testShareTransactions(){
        Test.setMock(HttpCalloutMock.class, new MockHttpResponseGenerator());
        Test.startTest();
             GetTransactionsController.ResultWrapper result= GetTransactionsController.callMuleSoftAPI(getFinancialAccountId());
        Test.stopTest();
        System.assertEquals('Loan Payment', result.result[0].get('ActionCode'));
        System.assertEquals(null, result.error); 
    }  
    
    @isTest
    public static void testError(){
        Test.setMock(HttpCalloutMock.class, new MockHttpResponseGeneratorError());
        Test.startTest();
             GetTransactionsController.ResultWrapper result= GetTransactionsController.callMuleSoftAPI(getFinancialAccountId());
        Test.stopTest();
        System.assertEquals(null, result.result);
    } 
    
    @isTest
    public static void testErrorCatch(){
        GetTransactionsController.ResultWrapper result= GetTransactionsController.callMuleSoftAPI('123');
    } 
    
    private static Id getFinancialAccountId() {
        return [SELECT Id FROM FinServ__FinancialAccount__c WHERE FinServ__FinancialAccountNumber__c = '180819' LIMIT 1].Id;
    }
    
    public class MockHttpResponseGenerator implements HttpCalloutMock {
        public HttpResponse respond(HttpRequest request) {
            HttpResponse response = new HttpResponse();
            response.setStatusCode(200);
            response.setBody('[{"AccountNumber":"0000180819","EffectiveDate":"2022-09-22","ActionCode":"P","SequenceNumber":"1874288"}]');
            return response;
        }
    }
    
    public class MockHttpResponseGeneratorError implements HttpCalloutMock {
        public HttpResponse respond(HttpRequest request) {
            HttpResponse response = new HttpResponse();
            response.setBody('{"message": "record not found"}');
            return response;
        }
    }
}