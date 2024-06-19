global class GlobalActionCreateActivityHelper implements omnistudio.VlocityOpenInterface{
    global Boolean invokeMethod(String methodName, Map<String,Object> input, Map<String,Object> output, Map<String,Object> options){
        System.debug('invoke Method');
        if(methodName.equals('getActivityOptions')){
            getActivityOptions(input, output, options);
        }
        return true;
    }
    global void getActivityOptions(Map<String,Object> input, Map<String,Object> output, Map<String,Object> options){
        System.debug('In Get Name');
        System.debug('input Values '+JSON.serializePretty(input));
        List<Map<String,String>> radioOptions = new List<Map<String,String>>();
        Map<String,Object> inputMap = (Map<String,Object>)JSON.deserializeUntyped(JSON.serialize(input));
		String ObjectApiName = (inputMap.get('ObjectApiName') != null )?(String)inputMap.get('ObjectApiName'): '';
        List<String> typeaheadOptions = new List<String>();
        System.debug('ObjectApiName => ' +ObjectApiName);
        String query = 'SELECT Id, Name FROM '+ObjectApiName;
        List<sObject> sObjectList = Database.query(query);
        System.debug('sObjectList'+sObjectList);
        for(sObject obj: sObjectList){
            Map<String,String> optionMap = new Map<String,String>();
            Map<String,Object> objValuesMap = (Map<String,Object>)JSON.deserializeUntyped(JSON.serialize(obj));
            optionMap.put('label',(String)objValuesMap.get('Name'));
            optionMap.put('value',(String)objValuesMap.get('Id'));
            typeaheadOptions.add((String)objValuesMap.get('Name'));
            radioOptions.add(optionMap);
        }
        System.debug('radioOptions ' +JSON.serializePretty(radioOptions));       
        output.put('options',radioOptions);
        output.put('data',typeaheadOptions);
    }
}