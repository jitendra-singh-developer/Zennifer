global class DependentPicklistValues implements omnistudio.VlocityOpenInterface{
    global Boolean invokeMethod(String methodName, Map<String,Object> input, Map<String,Object> output, Map<String,Object> options){
        System.debug('invoke Method');
		if(methodName.equals('getPickListValues')){
            getPickListValues(input, output, options);
        }
        return true;
    }
    
    global void getPickListValues(Map<String,Object> input, Map<String,Object> output, Map<String,Object> options){
        System.debug('input Values '+JSON.serializePretty(input));
        Map<String,Object> inputMap = (Map<String,Object>)JSON.deserializeUntyped(JSON.serialize(input));
        
        List<Map<String,String>> radioOptions = new List<Map<String,String>>();
        
        String objectName = (String)inputMap.get('objectApiName');
        String dependentFieldName = (String)inputMap.get('dependentFieldName');
        String controlValue = (String)inputMap.get('controlValue');
        
        Schema.SObjectType sobjType = Schema.getGlobalDescribe().get(objectName);
        Schema.DescribeSObjectResult describeResult = sobjType.getDescribe();
        Schema.SObjectField dependentField = describeResult.fields.getMap().get(dependentFieldName);
        Map<Object, List<String>> values = DependentPicklistValues.getDependentPicklistValues(dependentField);
        
        List<String> dependentOptions = (values.get(controlValue) != null) ? values.get(controlValue) : new List<String>{'None'};
         
        System.debug('options ' +JSON.serializePretty(dependentOptions));       
        output.put('options',dependentOptions);
    }
	global static Map<Object,List<String>> getDependentPicklistValues(Schema.sObjectField dependentField){
        Map<Object,List<String>> dependentPicklistValues = new Map<Object,List<String>>();
		//Get dependent field result
        Schema.DescribeFieldResult dependentFieldResult = dependentField.getDescribe();
		//Get dependent field controlling field 
        Schema.sObjectField controllerField = dependentFieldResult.getController();
		//Check controlling field is not null
        if(controllerField == null){
            return null;
        } 
		//Get controlling field result
        Schema.DescribeFieldResult controllerFieldResult = controllerField.getDescribe();
		//Get controlling field picklist values if controlling field is not a checkbox
        List<Schema.PicklistEntry> controllerValues = (controllerFieldResult.getType() == Schema.DisplayType.Boolean ? null : controllerFieldResult.getPicklistValues());
        
		//It is used to decode the characters of the validFor fields. 
        String base64map = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
        
        for (Schema.PicklistEntry entry : dependentFieldResult.getPicklistValues()){
            System.debug('JSON.serializePretty(vlaues)'+JSON.serializePretty(entry));
            if (entry.isActive()){
			//The PicklistEntry is serialized and deserialized using the Apex JSON class and it will check to have a 'validFor' field
                List<String> base64chars = String.valueOf(((Map<String,Object>)JSON.deserializeUntyped(JSON.serialize(entry))).get('validFor')).split('');
                System.debug('base64chars'+base64chars);
                for (Integer i = 0; i < controllerValues.size(); i++){
                    Object controllerValue = (controllerValues == null ? (Object) (i == 1) : (Object) (controllerValues[i].isActive() ? controllerValues[i].getValue() : null));
                    Integer bitIndex = i / 6;
                    Integer bitShift = 5 - Math.mod(i, 6 );
                    if(controllerValue == null || (base64chars != null && (base64map.indexOf(base64chars[bitIndex]) & (1 << bitShift)) == 0)){
                        continue;
                    } 
                    if (!dependentPicklistValues.containsKey(controllerValue)){
                        dependentPicklistValues.put(controllerValue, new List<String>());
                    }
                    dependentPicklistValues.get(controllerValue).add(entry.getValue());
                }
            } 
        }
        System.debug(JSON.serializePretty(dependentPicklistValues));
        return dependentPicklistValues;
        
    }
}