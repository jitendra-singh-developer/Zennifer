global with sharing class SaveCaseDetails implements Callable{
     public Object call(String action, Map<String, Object> args) {

        Map<String, Object> input = (Map<String, Object>)args.get('input');
        Map<String, Object> output = (Map<String, Object>)args.get('output');
        Map<String, Object> options = (Map<String, Object>)args.get('options');

        return invokeMethod(action, input, output, options);
    }
    private Object invokeMethod(String methodName, Map<String, Object> input, Map<String, Object> output, Map<String, Object> options) {
        System.debug('methodName '+methodName);
        if(methodName == 'saveData'){
            Map<String,Object> inputMap = (Map<String,Object>)JSON.deserializeUntyped(JSON.serialize(input));
            Map<String,Object> createCaseMap = (Map<String,Object>)JSON.deserializeUntyped(JSON.serialize(inputMap.get('CreateCase')));
            Map<String,Object> caseDetailsMap = (Map<String,Object>)JSON.deserializeUntyped(JSON.serialize(createCaseMap.get('CaseDetails')));
            System.debug('caseDetailsMap '+JSON.serializePretty(caseDetailsMap));
            String contextId = (String)inputMap.get('ContextId');
            Set<String> financialAccountIds = new Set<String>();
            Set<String> transactionIds = new Set<String>();
          //  System.debug(getTypeX(caseDetailsMap.get('Accounts_Financial_Accounts__c')));
                       
            System.debug('AccountFABlocktype '+getTypeX(caseDetailsMap.get('AccountFABlock')));
            System.debug('FinancialAccountFABlocktype '+getTypeX(caseDetailsMap.get('FinancialAccountFABlock')));

           // Map<String,Object> financialBlockMap =(Map<String,Object>)JSON.deserializeUntyped(JSON.serialize(caseDetailsMap.get('FinancialBlock')));

            //Account :- Finance block
            if(getTypeX(caseDetailsMap.get('FinancialBlock')) == 'List'){
                System.debug('FinancialBlock');
                List<Object> objList = (List<Object>)JSON.deserializeUntyped(JSON.serialize(caseDetailsMap.get('FinancialBlock')));

                    for(Object obj :objList){
                        Map<String,Object> objMap = (Map<String,Object>)JSON.deserializeUntyped(JSON.serialize(obj));

                        //AccountID
                        if(getTypeX(objMap.get('Accounts_Financial_Accounts__c')) == 'String' || getTypeX(objMap.get('Accounts_Financial_Accounts__c')) == 'Id'){
                            financialAccountIds.add((String)objMap.get('Accounts_Financial_Accounts__c'));
                        }

                        if(getTypeX(objMap.get('Account_Financial_Account_Transactions__c')) == 'String'){
                            transactionIds.add((String)objMap.get('Account_Financial_Account_Transactions__c'));
                        }else if(getTypeX(objMap.get('Account_Financial_Account_Transactions__c')) == 'Id'){
                                transactionIds.add((String)objMap.get('Account_Financial_Account_Transactions__c'));
                        }else if(getTypeX(objMap.get('Account_Financial_Account_Transactions__c')) == 'List'){
                            List<Object> idList = (List<Object>)JSON.deserializeUntyped(JSON.serialize(objMap.get('Account_Financial_Account_Transactions__c')));
                            for(Object o: idList){
                                transactionIds.add(String.valueOf(o));
                            }
                        } 

                        //Transactions
                        if(getTypeX(objMap.get('FinancialAccount_Financial_Account__c')) == 'String' || getTypeX(objMap.get('FinancialAccount_Financial_Account__c')) == 'Id'){
                            financialAccountIds.add((String)objMap.get('FinancialAccount_Financial_Account__c'));
                        }

                        if(getTypeX(objMap.get('FinancialAccount_Financial_Account_Transactions__c')) == 'String'){
                            transactionIds.add((String)objMap.get('FinancialAccount_Financial_Account_Transactions__c'));
                        }else if(getTypeX(objMap.get('FinancialAccount_Financial_Account_Transactions__c')) == 'Id'){
                                transactionIds.add((String)objMap.get('FinancialAccount_Financial_Account_Transactions__c'));
                        }else if(getTypeX(objMap.get('FinancialAccount_Financial_Account_Transactions__c')) == 'List'){
                            List<Object> idList = (List<Object>)JSON.deserializeUntyped(JSON.serialize(objMap.get('FinancialAccount_Financial_Account_Transactions__c')));
                            for(Object o: idList){
                                transactionIds.add(String.valueOf(o));
                            }
                        }
                    }

            }else{
                    Map<String,Object> objMap = (Map<String,Object>)JSON.deserializeUntyped(JSON.serialize(caseDetailsMap.get('FinancialBlock')));

                        //AccountID
                        if(getTypeX(objMap.get('Accounts_Financial_Accounts__c')) == 'String' || getTypeX(objMap.get('Accounts_Financial_Accounts__c')) == 'Id'){
                            financialAccountIds.add((String)objMap.get('Accounts_Financial_Accounts__c'));
                        }

                        if(getTypeX(objMap.get('Account_Financial_Account_Transactions__c')) == 'String'){
                            transactionIds.add((String)objMap.get('Account_Financial_Account_Transactions__c'));
                        }else if(getTypeX(objMap.get('Account_Financial_Account_Transactions__c')) == 'Id'){
                                transactionIds.add((String)objMap.get('Account_Financial_Account_Transactions__c'));
                        }else if(getTypeX(objMap.get('Account_Financial_Account_Transactions__c')) == 'List'){
                            List<Object> idList = (List<Object>)JSON.deserializeUntyped(JSON.serialize(objMap.get('Account_Financial_Account_Transactions__c')));
                            for(Object o: idList){
                                transactionIds.add(String.valueOf(o));
                            }
                        } 

                        //Transactions
                        if(getTypeX(objMap.get('FinancialAccount_Financial_Account__c')) == 'String' || getTypeX(objMap.get('FinancialAccount_Financial_Account__c')) == 'Id'){
                            financialAccountIds.add((String)objMap.get('FinancialAccount_Financial_Account__c'));
                        }

                        if(getTypeX(objMap.get('FinancialAccount_Financial_Account_Transactions__c')) == 'String'){
                            transactionIds.add((String)objMap.get('FinancialAccount_Financial_Account_Transactions__c'));
                        }else if(getTypeX(objMap.get('FinancialAccount_Financial_Account_Transactions__c')) == 'Id'){
                                transactionIds.add((String)objMap.get('FinancialAccount_Financial_Account_Transactions__c'));
                        }else if(getTypeX(objMap.get('FinancialAccount_Financial_Account_Transactions__c')) == 'List'){
                            List<Object> idList = (List<Object>)JSON.deserializeUntyped(JSON.serialize(objMap.get('FinancialAccount_Financial_Account_Transactions__c')));
                            for(Object o: idList){
                                transactionIds.add(String.valueOf(o));
                            }
                        }
            }




            //Account Ids
    /*        if(getTypeX(financialBlockMap.get('Accounts_Financial_Accounts__c')) == 'String'){
                financialAccountIds.add((String)caseDetailsMap.get('Accounts_Financial_Accounts__c'));
            }else if(getTypeX(financialBlockMap.get('Accounts_Financial_Accounts__c')) == 'Id'){
                financialAccountIds.add((String)financialBlockMap.get('Accounts_Financial_Accounts__c'));
            }else if(getTypeX(financialBlockMap.get('Accounts_Financial_Accounts__c')) == 'List'){
                List<Object> idList = (List<Object>)JSON.deserializeUntyped(JSON.serialize(financialBlockMap.get('Accounts_Financial_Accounts__c')));
                for(Object o: idList){
                    financialAccountIds.add(String.valueOf(o));
                }
            }
            
            if(getTypeX(financialBlockMap.get('FinancialAccount_Financial_Account__c')) == 'String'){
                 financialAccountIds.add((String)financialBlockMap.get('FinancialAccount_Financial_Account__c'));
            }else if(getTypeX(financialBlockMap.get('FinancialAccount_Financial_Account__c')) == 'Id'){
                 financialAccountIds.add(contextId);
            }else if(getTypeX(financialBlockMap.get('FinancialAccount_Financial_Account__c')) == 'List'){
                List<Object> idList = (List<Object>)JSON.deserializeUntyped(JSON.serialize(financialBlockMap.get('FinancialAccount_Financial_Account__c')));
                for(Object o: idList){
                    financialAccountIds.add(String.valueOf(o));
                }
            }
 
            //disputed Transaction Ids
           
            if(getTypeX(financialBlockMap.get('Account_Financial_Account_Transactions__c')) == 'String'){
                 transactionIds.add((String)financialBlockMap.get('Account_Financial_Account_Transactions__c'));
            }else if(getTypeX(financialBlockMap.get('Account_Financial_Account_Transactions__c')) == 'Id'){
                 transactionIds.add((String)financialBlockMap.get('Account_Financial_Account_Transactions__c'));
            }else if(getTypeX(financialBlockMap.get('Account_Financial_Account_Transactions__c')) == 'List'){
                List<Object> idList = (List<Object>)JSON.deserializeUntyped(JSON.serialize(financialBlockMap.get('Account_Financial_Account_Transactions__c')));
                for(Object o: idList){
                    transactionIds.add(String.valueOf(o));
                }
            }
            
            if(getTypeX(financialBlockMap.get('FinancialAccount_Financial_Account_Transactions__c')) == 'String'){
                 transactionIds.add((String)financialBlockMap.get('FinancialAccount_Financial_Account_Transactions__c'));
            }else if(getTypeX(financialBlockMap.get('FinancialAccount_Financial_Account_Transactions__c')) == 'Id'){
                 transactionIds.add((String)financialBlockMap.get('FinancialAccount_Financial_Account_Transactions__c'));
            }else if(getTypeX(financialBlockMap.get('FinancialAccount_Financial_Account_Transactions__c')) == 'List'){
                List<Object> idList = (List<Object>)JSON.deserializeUntyped(JSON.serialize(financialBlockMap.get('FinancialAccount_Financial_Account_Transactions__c')));
                for(Object o: idList){
                    transactionIds.add(String.valueOf(o));
                }
            }
     */       
            //Files Ids
            List<Object> fileUploaded = (caseDetailsMap.get('FileUpload') != null)? (List<Object>)JSON.deserializeUntyped(JSON.serialize(caseDetailsMap.get('FileUpload'))) : new List<Object>();
            System.debug('fileUploaded '+JSON.serializePretty(fileUploaded));
            String caseId = (String)inputMap.get('CaseId');
            System.debug('financialAccountsIds'+financialAccountIds);
            
            //Files
            List<ContentDocumentLink> cdlList = new List<ContentDocumentLink>();
            if(!fileUploaded.isEmpty()){
                for(Object o: fileUploaded){
                    Map<String,Object> fileDetails = (Map<String,Object>)JSON.deserializeUntyped(JSON.serialize(o));   
                    ContentDocumentLink cdl = new ContentDocumentLink();
                    cdl.LinkedEntityId = caseId;
                    cdl.ContentDocumentId = (Id)fileDetails.get('data');
                    cdl.ShareType = 'V';
                    cdlList.add(cdl);
                }
            }
            
            //Financial Accounts
            List<Case_Financial_Account__c> cfaList = new List<Case_Financial_Account__c>();
            if(!financialAccountIds.isEmpty()){
                for(String idVal : financialAccountIds){
                    Case_Financial_Account__c cfa = new Case_Financial_Account__c();
                    cfa.Financial_Account__c = idVal;
                    cfa.Case__c = caseId;
                    cfaList.add(cfa);
                }
            }
            
            // Transactions
            List<Disputed_Transactions__c> disputedTransactionList = new List<Disputed_Transactions__c>();
            if(!transactionIds.isEmpty()){
                for(String idVal : transactionIds){
                    Disputed_Transactions__c disTrans = new Disputed_Transactions__c();
                    disTrans.Financial_Account_Transaction__c = idVal;
                    disTrans.Case__c = caseId;
                    disputedTransactionList.add(disTrans);
                }
            }
            if(!cdlList.isEmpty()){
                insert cdlList;
            }
            if(!cfaList.isEmpty()){
                insert cfaList;
            }
            if(!disputedTransactionList.isEmpty()){
                insert disputedTransactionList ;
            }
            
        }
        return true;
    }
    
     public static String getTypeX(Object o) {
        if(o==null)                         return '';              // we can't say much about null
        String                              result  = 'Object';     // if we can't find out anything, we will return 'Object'
        if(o instanceof List<object>)       return 'List';
        if(o instanceof Id)                 return 'Id';
        try {                                                       
            Name a = (Name) o;                                      // INTENTIONALLY force runtime exception like: "Invalid conversion from runtime type Map<Id,List<Account>> to Name"
        } catch (Exception e) {
            result = e.getMessage().substringAfter('from runtime type ').substringBefore(' ');
            
        }
        return result;
    }
}