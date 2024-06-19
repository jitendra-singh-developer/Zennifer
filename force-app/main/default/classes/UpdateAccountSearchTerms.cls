public class UpdateAccountSearchTerms implements Database.Batchable<sObject>,Database.Stateful{

    public Database.QueryLocator start(Database.BatchableContext bc){
        String query= 'SELECT Id, FirstName,LastName, Name ,Account_Search_Terms__c FROM Account';
        return Database.getQueryLocator(query);
    }
    
    public void execute(Database.BatchableContext bc, List<Account> conList){
        List<Account> updList = new List<Account>();
        for(Account acc: conList){
            String name = (acc.FirstName != null && acc.LastName != null) ? acc.FirstName+' '+acc.LastName : acc.Name;
            if(acc.Account_Search_Terms__c != name){
                acc.Account_Search_Terms__c  = name;
            }
           
            updList.add(acc);
        }
        
        if(!updList.isEmpty()){
            update updList;
        }
    }
    
    public void finish(Database.BatchableContext bc){
        
    }
}