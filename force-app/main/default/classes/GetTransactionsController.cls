public class GetTransactionsController{
    @AuraEnabled
    public static ResultWrapper callMuleSoftAPI(String finAccountId) {
        List<Map<String, Object>> transactionData = new List<Map<String, Object>>();
        ResultWrapper resultWrapper = new ResultWrapper();
        try {
            HttpResponse resp = makeMuleSoftAPICall(finAccountId);
            if (resp.getStatusCode() == 200) {
                List<Object> parsedResponse = (List<Object>) JSON.deserializeUntyped(resp.getBody());
                for (Object obj : parsedResponse) {
                    Map<String, Object> transactions = (Map<String, Object>) obj;
                    transactionData.add(transactions);
                } 
				List<Map<String, Object>> replacedTransactionData = replaceActionCode(transactionData);                               
                resultWrapper.result = replacedTransactionData;
            }else {
                Map<String, Object> errorData = (Map<String, Object>) JSON.deserializeUntyped(resp.getBody());
                String errorMessage = (String) errorData.get('message');
                resultWrapper.error = errorMessage;
            }            
        } catch (Exception e) {
             resultWrapper.error = e.getMessage();
        }
        return resultWrapper;
    }
    
    private static HttpResponse makeMuleSoftAPICall(String finAccountId) {
        FinServ__FinancialAccount__c finAcc = [SELECT FinServ__FinancialAccountNumber__c, RecordType.name   
                                               FROM FinServ__FinancialAccount__c 
                                               WHERE Id = :finAccountId LIMIT 1];   
        String recordType = finAcc.RecordType.Name;
        if (recordType == 'Loan Account' || recordType == 'Mortgage') {
            recordType = 'Loan';
        } else {
            recordType = 'Share';
        }
        
		ShareTransactionsConfig__c apiSettings = ShareTransactionsConfig__c.getOrgDefaults(); 
        //String endpointUrl = apiSettings.Endpoint_URL__c + '/' + finAcc.FinServ__FinancialAccountNumber__c + '/' + finAcc.Account_Type_Code__c + '?type=' + recordType;
        String endpointUrl = apiSettings.Endpoint_URL__c;
        HttpRequest httpRequest = new HttpRequest();
        httpRequest.setEndpoint(endpointUrl);
        httpRequest.setMethod('GET');
        httpRequest.setHeader('client_id', apiSettings.Client_ID__c);
        httpRequest.setHeader('client_secret', apiSettings.Client_Secret__c);
        HttpResponse httpResponse = new Http().send(httpRequest);       
        return httpResponse;         
    }
    
    public static List<Map<String, Object>> replaceActionCode(List<Map<String, Object>> transactionData) {
        Map<String, String> codeMappings = new Map<String, String>();       
        for (ActionCode_Mapping__c mapping : ActionCode_Mapping__c.getAll().values()) {
            codeMappings.put(mapping.Action_Code__c , mapping.Name);
        }
        
        for (Map<String, Object> trans : transactionData) {
            String actionCode = (String) trans.get('ActionCode');
            if (codeMappings.containsKey(actionCode)) {
                trans.put('ActionCode', codeMappings.get(actionCode));
            }
        }
        return transactionData;
	}
    
    public class ResultWrapper {
        @AuraEnabled
        public List<Map<String, Object>> result { get; set; }
        @AuraEnabled
        public String error { get; set; }
    }
}