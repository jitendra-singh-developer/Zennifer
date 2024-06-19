@istest
public class FinancialAccountGetTransactionsTest {
    @istest(seealldata=true)
    public static void TestM1(){
        Map<String,String> map1 = new Map<String,String>();
        map1.put('AccountType','DDA');
        map1.put('AccountNumber','DDA');
        map1.put('StartDateF','14444444');
        map1.put('EndDateF','DDA');
        
        Map<String,Map<String,String>> inputMap = new Map<String,Map<String,String>>();
        inputMap.put('Transactions',map1);
        Map<String,Object> output = new Map<String,Object>();
        Map<String,Object> options = new Map<String,Object>();
        
         Test.setMock(HttpCalloutMock.class, new MockHttpResponse());
        Test.startTest();
        FinancialAccountGetTransactions fa = new FinancialAccountGetTransactions();
        
        fa.invokeMethod('getTransactions', inputMap, output, options);
        Test.StopTest();
    }
    
        public class MockHttpResponse implements HttpCalloutMock {
        public HTTPResponse respond(HTTPRequest req) {
            HttpResponse res = new HttpResponse();
            res.setStatusCode(200);
            res.setBody('{"total":1,"access_token":"Test" ,"results":[{"financialAccount":{"accountNumber":"12345678","balances":[{"sourceType":"Ledger","amount":{"amount":109.45}},{"sourceType":"Principal","amount":{"amount":109.45}},{"sourceType":"Current","amount":{"amount":109.45}},{"sourceType":"Hold","amount":{"amount":0.00}},{"sourceType":"Ledger","amount":{"amount":123.45}},{"sourceType":"InterestAccrued","amount":{"amount":0.00}},{"sourceType":"InterestDue","amount":{"amount":0.00}}],"status":{"status":"Active"}}}]}');
            return res;
        }
    }
}