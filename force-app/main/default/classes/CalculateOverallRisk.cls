global class CalculateOverallRisk implements omnistudio.VlocityOpenInterface{
	 public Boolean invokeMethod(String methodName, Map<String,Object> input, Map<String,Object> output, Map<String,Object> options){
        System.debug('invoke Method');
        if(methodName.equals('getRiskScore')){
            getRiskScore(input, output, options);
        }
        return true;
    }
    
    public static void getRiskScore(Map<String,Object> input, Map<String,Object> output, Map<String,Object> options){
        System.debug(JSON.serializePretty(input));
        String overAllRisk = '';
        List<Object> riskInputRisk = (List<Object>)JSON.deserializeUntyped(JSON.serialize(input.get('RiskList')));
        List<String> finalScoreList = new List<String>();
        for(Object obj: riskInputRisk){
            Map<String,Object> objValuesMap = (Map<String, Object>)JSON.deserializeUntyped(JSON.serialize(obj));
            String finalScore = (String)objValuesMap.get('FinalScore');
            System.debug('score '+finalScore);
            finalScoreList.add(finalScore);
        }
        if(!finalScoreList.isEmpty()){
            if(finalScoreList.contains('Prohibited') || finalScoreList.contains('OFAC Sanctioned')){
                 overAllRisk = 'Prohibited';
            }else if(finalScoreList.contains('Special Approval')){
                 overAllRisk = 'Special Approval';
            }else if(finalScoreList.contains('High Risk')){
               overAllRisk = 'High Risk' ;
            }else if(finalScoreList.contains('Low Risk')){
               overAllRisk = 'Not High Risk';
            }else{
                overAllRisk = 'None';
            }
        }else{
                overAllRisk = 'None';
            }
        System.debug('overAllRisk ' +overAllRisk);
        output.put('OverRiskScore',overAllRisk);
    }
    
}