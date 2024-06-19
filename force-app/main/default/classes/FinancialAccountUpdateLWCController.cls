public without sharing class FinancialAccountUpdateLWCController {
    @AuraEnabled
    public static resultWrapper calloutRecordUpdate(String recordId){
        ResultWrapper resultWrapper = new ResultWrapper();
        Boolean isSuccess = false;
        try {
			String objectType;
            Id id = (Id) recordId;
            SObjectType sObjectType = id.getSObjectType();
            objectType = sObjectType.getDescribe().getName();
			List<FinServ__FinancialAccount__c> financialAccountsToUpdate;
            
            HttpResponse response = makeHttpCalloutAcc(recordId,objectType);  
            if (response.getStatusCode() == 200) {
                if(objectType == 'Account'){
                   financialAccountsToUpdate = getFinAccToUpdateFromAcc(response,recordId); 
                } else if (objectType == 'FinServ__FinancialAccount__c'){
                   financialAccountsToUpdate = getFinAccToUpdate(response,recordId);
                }              
                if (!financialAccountsToUpdate.isEmpty()) {
                    update financialAccountsToUpdate;                    
                }
				resultWrapper.isSuccess = true; 
            } else {
                String errorMsg = extractReason(response.getbody());
				resultWrapper.error = 'Error details: ' + errorMsg;
            }
        } catch (Exception e) {
            resultWrapper.error = 'Error details: '+e.getMessage();
        }
        return resultWrapper;
    }
    
    private static List<FinServ__FinancialAccount__c> getFinAccToUpdateFromAcc(HttpResponse jsonResponse, String accountId) {
        List<FinServ__FinancialAccount__c> financialAccountsToUpdate = new List<FinServ__FinancialAccount__c>();        
        Map<String, Object> responseMap = (Map<String, Object>) JSON.deserializeUntyped(jsonResponse.getbody());
        List<Object> results = (List<Object>) responseMap.get('results');
        Set<String> accountNumbers = new Set<String>();
        
        if (jsonResponse.getStatusCode() == 200 && responseMap.get('results') != null) {
            for (Object resultObj : results) {
                Map<String, Object> result = (Map<String, Object>) resultObj;
                Map<String, Object> financialAccount = (Map<String, Object>) result.get('financialAccount');
                String accountNumber = (String) financialAccount.get('accountNumber');
                accountNumbers.add(accountNumber);
            }
            // Query the Financial Account records based on account numbers
            List<FinServ__FinancialAccount__c> existingFinancialAccounts = [
                SELECT Id, FinServ__Balance__c, FinServ__CurrentPostedBalance__c, FinServ__InterestBalance__c, FinServ__FinancialAccountNumber__c
                FROM FinServ__FinancialAccount__c
                WHERE FinServ__FinancialAccountNumber__c IN :accountNumbers AND FinServ__PrimaryOwner__c = :accountId
            ];
            Map<String, FinServ__FinancialAccount__c> accountMap = new Map<String, FinServ__FinancialAccount__c>();
            
            // Populate a map for quick lookup
            for (FinServ__FinancialAccount__c account : existingFinancialAccounts) {
                accountMap.put(account.FinServ__FinancialAccountNumber__c, account);
            }            
            // Iterate through the results and update Financial Account records
            for (Object resultObj : results) {
                Map<String, Object> result = (Map<String, Object>) resultObj;
                Map<String, Object> financialAccount = (Map<String, Object>) result.get('financialAccount');
                String accountNumber = (String) financialAccount.get('accountNumber');
                
                if (accountMap.containsKey(accountNumber)) {
                    FinServ__FinancialAccount__c financialAccountRecord = accountMap.get(accountNumber);                    
                    List<Object> balances = (List<Object>) financialAccount.get('balances');
                    Decimal availBalance = null;
                    Decimal currentBalance = null;
                    Decimal holdBalance = null;
					Decimal principalBalance = null;
                    
                    for (Object balanceObj : balances) {
                        Map<String, Object> balance = (Map<String, Object>) balanceObj;
                        String sourceType = (String) balance.get('sourceType');
                        Map<String, Object> amountObj = (Map<String, Object>) balance.get('amount');
                        Decimal amount = (Decimal) amountObj.get('amount');
                        
                        if (sourceType.equals('Current')) {
                            availBalance = amount;
                        } else if (sourceType.equals('Ledger')) {
                            currentBalance = amount;
                        } else if (sourceType.equals('Hold')) {
                            holdBalance = amount;
							financialAccountRecord.FinServ__TotalHoldAmountAsOfDate__c  = Date.today();
                        } else if (sourceType.equals('Principal')) {
                            principalBalance = amount;
                        }
                    }                    
                    // Update the Financial Account fields
                    financialAccountRecord.FinServ__Balance__c = availBalance;
                    financialAccountRecord.FinServ__CurrentPostedBalance__c = currentBalance;
                    financialAccountRecord.FinServ__TotalHoldAmount__c = holdBalance;
					financialAccountRecord.FinServ__PrincipalBalance__c = principalBalance;
                    system.debug(financialAccountRecord);
                    financialAccountsToUpdate.add(financialAccountRecord);
                }
            }
        }        
        return financialAccountsToUpdate;
    }
    	    
    private static List<FinServ__FinancialAccount__c> getFinAccToUpdate(HttpResponse jsonResponse, String recordId) {
        List<FinServ__FinancialAccount__c> financialAccountsToUpdate = new List<FinServ__FinancialAccount__c>();        
		Map<String, Object> parsedResponse = (Map<String, Object>) JSON.deserializeUntyped(jsonResponse.getbody());
		List<Object> balances = (List<Object>) parsedResponse.get('balances');
        FinServ__FinancialAccount__c finAcc = new FinServ__FinancialAccount__c();
        
        if (jsonResponse.getStatusCode() == 200 && parsedResponse.get('balances') != null) {
            for (Object balanceObj : balances) {
                Map<String, Object> balance = (Map<String, Object>) balanceObj;
                String sourceType = (String) balance.get('sourceType');
                Map<String, Object> amount = (Map<String, Object>) balance.get('amount');
                Decimal amountValue = (Decimal) amount.get('amount');
                
                if (sourceType == 'Current') {
                    finAcc.FinServ__Balance__c = amountValue;
                } else if (sourceType == 'Ledger') {
                    finAcc.FinServ__CurrentPostedBalance__c = amountValue;
                } else if (sourceType == 'Hold') {
                    finAcc.FinServ__TotalHoldAmount__c = amountValue;
					finAcc.FinServ__TotalHoldAmountAsOfDate__c  = Date.today();
                }
				 else if (sourceType == 'Principal') {
                    finAcc.FinServ__PrincipalBalance__c = amountValue;
                }                
				finAcc.Id = recordId;
            }
			financialAccountsToUpdate.add(finAcc);
        }        
        return financialAccountsToUpdate;
    }

    private static HttpResponse makeHttpCalloutAcc(String recordId, String objectType) {
		FinancialAccountAPIConfig__c   config = FinancialAccountAPIConfig__c.getOrgDefaults();
		String endpointUrl;
		String accountType;
        if(objectType == 'Account'){
            Account acc = [SELECT LLC_BI__lookupKey__c    
                           FROM Account 
                           WHERE Id = :recordId LIMIT 1];                         
          endpointUrl = config.Endpoint_URL__c + '/accounts/'+acc.LLC_BI__lookupKey__c+'/summary';  
        } else if (objectType == 'FinServ__FinancialAccount__c'){
            FinServ__FinancialAccount__c  finAcc = [SELECT FinServ__FinancialAccountNumber__c,Account_Type__c     
                                                    FROM FinServ__FinancialAccount__c  
                                                    WHERE Id = :recordId LIMIT 1]; 
            if(finAcc.Account_Type__c == 'COD'){
                accountType = 'CDA';
            }else if(finAcc.Account_Type__c == 'SAV'){
                accountType = 'SDA';
            }else{
                accountType = finAcc.Account_Type__c;
            }
			endpointUrl = config.Endpoint_URL__c + '/financialaccounts/'+finAcc.FinServ__FinancialAccountNumber__c+'?financialAccountType='+accountType;
        }
        String authHeader = 'Basic ' + EncodingUtil.base64Encode(Blob.valueOf(config.User_Name__c + ':' + config.Password__c));        
        // Create an HTTP request
        HttpRequest request = new HttpRequest();
        request.setEndpoint(endpointUrl);
        request.setMethod('GET'); 
        request.setHeader('Authorization', authHeader);
        request.setHeader('x-correlation-id', config.X_Correlation_Id__c);
        request.setHeader('client_id', '');
        request.setHeader('client_secret','');        
        // Make the HTTP callout and return the response
        Http http = new Http();
        return http.send(request);
    }
		
    public static String extractReason(String jsonResponse) {
        String errorMsg = null;
        Map<String, Object> responseMap = (Map<String, Object>) JSON.deserializeUntyped(jsonResponse);
        if (responseMap.containsKey('errorDetails')) {
            List<Object> errorDetails = (List<Object>) responseMap.get('errorDetails');
            if (!errorDetails.isEmpty()) {
                Map<String, Object> firstError = (Map<String, Object>) errorDetails[0];
                if (firstError.containsKey('reason')) {
                	errorMsg = 'Code: ' + (Integer) firstError.get('code') + ', Reason: ' + (String) firstError.get('reason');
                }
            }
        }        
        return errorMsg;
    }
    
    @AuraEnabled
    public static String getRecordName(String recordId) {
		String recordName;
        String objectType;
        Id id = (Id) recordId;
        SObjectType sObjectType = id.getSObjectType();
        objectType = sObjectType.getDescribe().getName();
        if(objectType == 'Account'){
            Account acc = [SELECT Name    
                           FROM Account 
                           WHERE Id = :recordId LIMIT 1];
			recordName = acc.Name;                        
        }else if (objectType == 'FinServ__FinancialAccount__c'){
            FinServ__FinancialAccount__c  finAcc = [SELECT Name    
                                                    FROM FinServ__FinancialAccount__c  
                                                    WHERE Id = :recordId LIMIT 1]; 
			recordName = finAcc.Name;  
        }
        return recordName;
    }

    public class ResultWrapper {
        @AuraEnabled
        public Boolean isSuccess { get; set; }
        @AuraEnabled
        public String error { get; set; }
    }  
    
    public class RecordRefreshControllerException extends Exception {}
}