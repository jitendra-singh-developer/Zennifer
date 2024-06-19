@istest
public class CalculateOverallRiskTest {
	@isTest static void testRiskScore() {
       	calculateoverallrisk riskObj = new calculateoverallrisk();
       	Map<String,Object> input= new Map<String,Object>();
        Map<String,Object> input2= new Map<String,Object>();
        input2.put('FinalScore',(Object)'Prohibited');
        input.put('RiskList',(Object)new List<Object>{(Object)input2});
        Boolean returnVal = riskobj.invokeMethod('getRiskScore',input,new Map<String,Object>(),new Map<String,Object>());
        System.assertEquals(returnVal, true, '');
        input2.put('FinalScore',(Object)'Special Approval');
        input.put('RiskList',(Object)new List<Object>{(Object)input2});
        returnVal =riskobj.invokeMethod('getRiskScore',input,new Map<String,Object>(),new Map<String,Object>());
        System.assertEquals(returnVal, true, '');
		input2.put('FinalScore',(Object)'High Risk');
        input.put('RiskList',(Object)new List<Object>{(Object)input2});
        returnVal =riskobj.invokeMethod('getRiskScore',input,new Map<String,Object>(),new Map<String,Object>());
        System.assertEquals(returnVal, true, '');
		input2.put('FinalScore',(Object)'Low Risk');
        input.put('RiskList',(Object)new List<Object>{(Object)input2});
        returnVal =riskobj.invokeMethod('getRiskScore',input,new Map<String,Object>(),new Map<String,Object>());
        System.assertEquals(returnVal, true, '');
        input2.put('FinalScore',(Object)'No Risk');
        input.put('RiskList',(Object)new List<Object>{(Object)input2});
        returnVal= riskobj.invokeMethod('getRiskScore',input,new Map<String,Object>(),new Map<String,Object>());
        System.assertEquals(returnVal, true, '');

    }
}