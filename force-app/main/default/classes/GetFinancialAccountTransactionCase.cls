/**
* @description       : 
* @author            : SUMEDH WASNIK
* @group             : GERENT
* @last modified on  : 10-04-2023
* @last modified by  : SUMEDH WASNIK
* Modifications Log
* Ver   Date         Author          Modification
* 1.0   09-13-2023   SUMEDH WASNIK   Initial Version
**/
global with sharing class GetFinancialAccountTransactionCase implements omnistudio.VlocityOpenInterface{
    public Boolean invokeMethod(String methodName, Map<String,Object> input, Map<String,Object> output, Map<String,Object> options){
        System.debug('invoke Method');
        if(methodName.equals('getFinancialAccountTransactions')){
            getFinancialAccountTransactions(input, output, options);
        }
        return true;
    }
    
    public void getFinancialAccountTransactions(Map<String,Object> input, Map<String,Object> output, Map<String,Object> options){
        System.debug('In Get record Types');
            Map<String,Object> inputMap = (Map<String,Object>)JSON.deserializeUntyped(JSON.serialize(input));
            Map<String,Object> createCaseMap = (Map<String,Object>)JSON.deserializeUntyped(JSON.serialize(inputMap.get('CreateCase')));
            Map<String,Object> caseDetailsMap = (Map<String,Object>)JSON.deserializeUntyped(JSON.serialize(createCaseMap.get('CaseDetails')));
          //  System.debug('caseDetailsMap '+JSON.serializePretty(caseDetailsMap));
            String contextId = (String)inputMap.get('ContextId');
            Set<String> financialAccountIds = new Set<String>();
            System.debug(getTypeX(caseDetailsMap.get('AccountFABlock')));

            //Account :- Finance block
            if(getTypeX(caseDetailsMap.get('AccountFABlock')) == 'List'){
                System.debug('Account FA BLock List');
                List<Object> accountFABlockList = (List<Object>)JSON.deserializeUntyped(JSON.serialize(caseDetailsMap.get('AccountFABlock')));
                for(Object obj: accountFABlockList){
                    Map<String,Object> objValuesMap = (Map<String, Object>)JSON.deserializeUntyped(JSON.serialize(obj));
                    
                    if(objValuesMap != null){
                        //Financial Account Id
                        financialAccountIds.add((String)objValuesMap.get('Accounts_Financial_Accounts__c'));
                    }
                }

            }else{
                System.debug('Account FA BLock Object');
                Map<String,Object> accountFAMap = (Map<String,Object>)JSON.deserializeUntyped(JSON.serialize(caseDetailsMap.get('AccountFABlock')));
                if(accountFAMap != null){
                        //Financial Account Id
                        financialAccountIds.add((String)accountFAMap.get('Accounts_Financial_Accounts__c'));
                }
            }


            //Financial Account :- Finance block
            if(getTypeX(caseDetailsMap.get('FinancialAccountFABlock')) == 'List'){
                System.debug('Account FA BLock List');
                List<Object> accountFABlockList = (List<Object>)JSON.deserializeUntyped(JSON.serialize(caseDetailsMap.get('FinancialAccountFABlock')));
                for(Object obj: accountFABlockList){
                    Map<String,Object> objValuesMap = (Map<String, Object>)JSON.deserializeUntyped(JSON.serialize(obj));
                    
                    if(objValuesMap != null){
                        //Financial Account Id
                        financialAccountIds.add((String)objValuesMap.get('FinancialAccount_Financial_Account__c'));
                    }
                }

            }else{
                System.debug('Account FA BLock Object');
                Map<String,Object> accountFAMap = (Map<String,Object>)JSON.deserializeUntyped(JSON.serialize(caseDetailsMap.get('FinancialAccountFABlock')));
                if(accountFAMap != null){
                        //Financial Account Id
                        financialAccountIds.add((String)accountFAMap.get('FinancialAccount_Financial_Account__c'));
                }
            }
        
/*            //Account Ids
            if(getTypeX(caseDetailsMap.get('Accounts_Financial_Accounts__c')) == 'String'){
                financialAccountIds.add((String)caseDetailsMap.get('Accounts_Financial_Accounts__c'));
            }else if(getTypeX(caseDetailsMap.get('Accounts_Financial_Accounts__c')) == 'Id'){
                financialAccountIds.add((String)caseDetailsMap.get('Accounts_Financial_Accounts__c'));
            }else if(getTypeX(caseDetailsMap.get('Accounts_Financial_Accounts__c')) == 'List'){
                List<Object> idList = (List<Object>)JSON.deserializeUntyped(JSON.serialize(caseDetailsMap.get('Accounts_Financial_Accounts__c')));
                for(Object o: idList){
                    financialAccountIds.add(String.valueOf(o));
                }
            }
            
            if(getTypeX(caseDetailsMap.get('FinancialAccount_Financial_Account__c')) == 'String'){
                 financialAccountIds.add((String)caseDetailsMap.get('FinancialAccount_Financial_Account__c'));
            }else if(getTypeX(caseDetailsMap.get('FinancialAccount_Financial_Account__c')) == 'Id'){
                 financialAccountIds.add(contextId);
            }else if(getTypeX(caseDetailsMap.get('FinancialAccount_Financial_Account__c')) == 'List'){
                List<Object> idList = (List<Object>)JSON.deserializeUntyped(JSON.serialize(caseDetailsMap.get('FinancialAccount_Financial_Account__c')));
                for(Object o: idList){
                    financialAccountIds.add(String.valueOf(o));
                }
            } 
*/
        
            List<FinServ__FinancialAccountTransaction__c> finTransList = [SELECT Id, Name, FinServ__TransactionId__c, Transaction_Omni_Label__c
                                                                            FROM FinServ__FinancialAccountTransaction__c
                                                                                WHERE FinServ__FinancialAccount__c IN : financialAccountIds];
            System.debug('FinAccountTrans ' + finTransList );
        
        
        List<Map<String,String>> radioOptions = new List<Map<String,String>>();
        for(FinServ__FinancialAccountTransaction__c finTrans: finTransList){
                Map<String,String> finTransMap = new Map<String,String>();
                
                finTransMap.put('value',finTrans.Transaction_Omni_Label__c);
                finTransMap.put('name',finTrans.Id);
                
                radioOptions.add(finTransMap);
        } 
        
        output.put('options',radioOptions);
        System.debug('output' +output);
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