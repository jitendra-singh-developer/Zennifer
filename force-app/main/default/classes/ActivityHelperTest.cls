global class ActivityHelperTest implements omnistudio.VlocityOpenInterface{
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
    } 
}