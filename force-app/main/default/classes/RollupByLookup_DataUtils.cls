public class RollupByLookup_DataUtils {
    
    public static void initiate() {
      	insertRollupByLookupRecords();
        insertRollupFilterCriteriaRecords();
    }
    
    private static void insertRollupByLookupRecords() {
        StaticResource rollupByLookupList = [
            SELECT Id, Body
            FROM StaticResource
            WHERE Name = 'rbl_Initial'
            LIMIT 1
        ];
        
        String resourceBody = rollupByLookupList.Body.toString();
        CSVReader resourceReader = new CSVReader(resourceBody, ',');
        
        resourceReader.readLine();
        
        String[] resourceBodyLine = resourceReader.readLine();
        
        List<FinServ__RollupByLookupConfig__c> initialList = new List<FinServ__RollupByLookupConfig__c>();
        for (integer i = 0; i < 52; i++) {
            FinServ__RollupByLookupConfig__c newRecord = new FinServ__RollupByLookupConfig__c();
            newRecord.FinServ__Active__c = false;
            newRecord.FinServ__FromField__c = resourceBodyLine[0];
            newRecord.FinServ__FromObject__c = resourceBodyLine[1];
            newRecord.FinServ__FromRecordType__c = resourceBodyLine[2];
            newRecord.FinServ__LookupField__c = resourceBodyLine[3];
            newRecord.FinServ__Namespace__c = resourceBodyLine[4];
            newRecord.FinServ__ProcessType__c = resourceBodyLine[5];
            newRecord.FinServ__RollupOperation__c = resourceBodyLine[6];
            newRecord.FinServ__ToField__c = resourceBodyLine[7];
            newRecord.FinServ__ToObject__c = resourceBodyLine[8];
            newRecord.FinServ__UpdateOnChange__c = resourceBodyLine[9];
            newRecord.FinServ__WhereClause__c = resourceBodyLine[10];
            newRecord.Name = resourceBodyLine[12];
            
            initialList.add(newRecord);
                        
            resourceBodyLine = resourceReader.readLine();
        }
        
        if (initialList != NULL) {
            insert initialList;
        }
    }
    private static void insertRollupFilterCriteriaRecords() {
        List<FinServ__RollupByLookupConfig__c> rblRecords = [
            SELECT Id, Name
            FROM FinServ__RollupByLookupConfig__c
        ];
        Map<String, Id> rblRecordsMap = new Map<String, Id>();
        for (FinServ__RollupByLookupConfig__c rblRecord : rblRecords) {
            rblRecordsMap.put(rblRecord.Name, rblRecord.Id);
        }
        
        StaticResource rollupCriteriaList = [
            Select Id, Body
            FROM StaticResource
            WHERE Name = 'rbl_FilterInitial'
            LIMIT 1
        ];
        String resourceBody = rollupCriteriaList.Body.toString();
        CSVReader resourceReader = new CSVReader(resourceBody, ',');
        
        resourceReader.readLine();
        
        String[] resourceBodyLine = resourceReader.readLine();
        
        List<FinServ__RollupByLookupFilterCriteria__c> initialList = new List<FinServ__RollupByLookupFilterCriteria__c>();
        for (integer i = 0; i < 46; i++) {
            FinServ__RollupByLookupFilterCriteria__c newFilterRecord = new FinServ__RollupByLookupFilterCriteria__c();
            newFilterRecord.FinServ__FieldName__c = resourceBodyLine[0];
            newFilterRecord.FinServ__FieldValue__c = resourceBodyLine[1];
            newFilterRecord.FinServ__Operator__c = resourceBodyLine[2];
            String name = resourceBodyLine[3].trim();
            newFilterRecord.FinServ__RollupByLookupConfig__c = rblRecordsMap.get(name);
            
            initialList.add(newFilterRecord);
            
            resourceBodyLine = resourceReader.readLine();
        }
        
        if (initialList != NULL) {
            
            insert initialList;
        }
    }
}