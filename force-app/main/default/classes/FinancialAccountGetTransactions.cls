global class FinancialAccountGetTransactions implements omnistudio.VlocityOpenInterface {
    
    public Boolean invokeMethod(String methodName, Map<String, Object> input, Map<String,Object> output, Map<String,Object> options){
        Boolean result = true;
        try{
            if(methodName.equalsIgnoreCase('getTransactions')){
                getTransactionsFinAcc(input, output, options);
            }
        }
        catch(Exception e){
            return false;
        }
        return result;
    }
    
    public void getTransactionsFinAcc(Map<String, Object> input, Map<String,Object> output, Map<String,Object> options){
        String endpointURL;
        System.debug('endPoint initial '+endpointURL);           
        
        Map<String,Object> transMap = (Map<String,Object>)JSON.deserializeUntyped(JSON.serialize(input.get('Transactions')));
        
        System.debug('transMap '+JSON.serializePretty(transMap));
        
        String accountType =  ( (String)transMap.get('AccountType') == 'SAV'? 'SDA' : ((String)transMap.get('AccountType') == 'COD' ? 'CDA' : (String)transMap.get('AccountType') ) );
        String accountNumber = (String)transMap.get('AccountNumber');
        String startDate = (String)transMap.get('StartDateF');
        String endDate = (String)transMap.get('EndDateF');
        
        endpointURL = '/financialaccounts/'+accountNumber+'/transactions?financialAccountType='+accountType+'&limit=100000000&startDate='+startDate+'&endDate='+endDate+'&includeMemoPost=true';
        
        System.debug('endPoint finale '+endpointURL);               
        HttpRequest request = new HttpRequest();
        request.setEndpoint('callout:BancofCalNamedCredentials'+endpointURL) ; ///financialaccounts/14444444/transactions?financialAccountType=DDA&limit=1000000000&startDate=2023-12-01T00:00:00.000Z&endDate=2024-01-01T00:00:00.000Z');
        request.setMethod('GET');
        
        Http http = new Http();

        HttpResponse response = http.send(request);
        
                System.debug('response Status '+response);
                System.debug('response Body '+response.getBody());
        if(response.getStatusCode() == 200){
            Map<String, Object> transInfo = (Map<String, Object>) JSON.deserializeUntyped(response.getBody());
            System.debug('response ' +JSON.serializePretty(transInfo));
            
            output.put('results',(List<Object>)JSON.deserializeUntyped(JSON.serialize(transInfo.get('results'))));
            output.put('total',(Integer)transInfo.get('total'));
        }
    }
    
}