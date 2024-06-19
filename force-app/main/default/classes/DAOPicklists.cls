public class DAOPicklists implements omnistudio.VlocityOpenInterface{
    public Boolean invokeMethod(String methodName, Map<String,Object> input, Map<String,Object> output, Map<String,Object> options){
        System.debug('invoke Method');
        if(methodName.equals('getStates')){
            getStates(input, output, options);
        }
        return true;
    }
    public void getStates(Map<String,Object> input, Map<String,Object> output, Map<String,Object> options){
        System.debug('In Get record Types');
        
        List<Map<String,String>> radioOptions = new List<Map<String,String>>();
        List<String> states = new List<String>{'Alabama','Alaska','Arizona','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Ohio','Oklahoma','Oregon','Pennsylvania','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virginia',
            'Washington',
            'West Virginia',
            'Wisconsin',
            'Wyoming'};
                for(String finTrans: States){
                    Map<String,String> finTransMap = new Map<String,String>();
                    
                    finTransMap.put('value',finTrans);
                    finTransMap.put('name',finTrans);
                    
                    radioOptions.add(finTransMap);
                } 
        
        output.put('options',radioOptions);
    }
}