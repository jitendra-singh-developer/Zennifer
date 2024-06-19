/**
 * Test for custom HTTP request transformation for required custom headers and encrypted URL endpoint values
 */
@isTest
private class CoreBankingAPITest {
    private static final String API_HOST = 'callout:MockNamedCredentialName';
    private static final String ENDPOINT_ACCOUNT_BALANCES = API_HOST + '/accounts/v1/account/encrypt({0})/balances';
    private static final String MOCK_ACCOUNT_NUMBER = '3333';
    private static final String MOCK_FINANCIAL_TRANSACTIONS_RESPONSE = '{"count":2,"data":[{"description":{"description1":"THIS","description2":"","description3":"IS","description4":null,"description5":"A","description6":"TEST"},"amount":1000.00,"transactionType":"C"},{"description":{"description1":"THIS","description2":"","description3":"IS","description4":null,"description5":"A","description6":"TEST"},"amount":21.99,"transactionType":"D"}]}';

    @isTest
    static void testTransformRequest() {
        HttpRequest req = new HttpRequest();
        req.setEndpoint(String.format(ENDPOINT_ACCOUNT_BALANCES, new List<Object>{MOCK_ACCOUNT_NUMBER}));
        req.setMethod('GET');

        //simulate what API Utility will invoke
        Test.startTest();
        req = new CoreBankingAPI().transformRequest(req);
        Test.stopTest();

        System.assert(
            req.getEndpoint().contains(MOCK_ACCOUNT_NUMBER) == false, 
            'Request endpoint should not contain original plain text sensitive value'
        );
    }

    @isTest
    static void testInvokeMethodOmniStudio() {
        String plainTextValue = '12345';
        Map<String,Object> inputMap = new Map<String,Object> {
            'value' => plainTextValue
        };
        Map<String,Object> outputMap = new Map<String,Object>();

        //simulate what API Utility will invoke
        Test.startTest();
        new CoreBankingAPI().invokeMethod('encrypt', inputMap, outputMap, null);
        Test.stopTest();

        System.assert(
            String.isNotBlank(String.valueOf(outputMap.get('value'))), 
            'Output map should have generated an encrypted value'
        );
        System.assertNotEquals(
            plainTextValue,
            String.valueOf(outputMap.get('value')), 
            'Encrypted value should not match the plain text value'
        );
    }

    @isTest
    static void testTransformResponse_FinancialTransactions() {
        //create mock response of the unique data that needs to get transformed
        HttpResponse res = new HttpResponse();
        res.setStatusCode(200);
        res.setBody(MOCK_FINANCIAL_TRANSACTIONS_RESPONSE);

        //simulate what API Utility will invoke
        Test.startTest();
        res = new CoreBankingAPI.TransactionsResponseTransformer().transformResponse(res);
        Test.stopTest();

        System.assert(
            res.getBody().equals(MOCK_FINANCIAL_TRANSACTIONS_RESPONSE) == false, 
            'Response data should contain modified results'
        );
    }
}