@RestResource(urlMapping='/MiddeskIntegration/Webhook')
global with sharing class MiddeskIntegration {
    
    @HttpPost
    global static String getTokenFromWebhook() {
        
        RestRequest req = RestContext.request;
        String requestBody = req.requestBody.toString();
        
        System.debug(requestBody);
        Map<String, Object> responseMap = (Map<String, Object>) System.JSON.deserializeUntyped(requestBody);
        
        Map<String,Object> dataMap = (Map<String, Object>) System.JSON.deserializeUntyped(JSON.serialize(responseMap.get('data')));
        Map<String,Object> linksMap = (Map<String, Object>) System.JSON.deserializeUntyped(JSON.serialize(dataMap.get('_links')));
        Map<String,Object> ApplicationLinkMap =(Map<String, Object>) System.JSON.deserializeUntyped(JSON.serialize(linksMap.get('journey_application')));
        
        
        //Url to get current status
        String applicationURL = (ApplicationLinkMap.containsKey('href') ? (String)ApplicationLinkMap.get('href') : null );
        //Journey Application Token
        String applicationToken = (dataMap.containsKey('journey_application_token') ? (String)dataMap.get('journey_application_token') : null );
        
        if(applicationURL != null && applicationToken != null){
            updateApplicationStatus(applicationURL, applicationToken );
        }
        
        
        String returnValue = 'Success' ;
        
        return returnValue;
    }
    
    global static void updateApplicationStatus(String applicationCallbackURL, String applicationToken){
        
        //Integration proceduer name
        String procedureName = 'DAOMiddesk_AlloyIntegration';
        
        //Create Integration procedure Map var
        Map <String, Object> ipInput = new Map <String, Object> ();
        Map <String, Object> ipOutput = new Map <String, Object> ();
        Map <String, Object> ipOptions = new Map <String, Object> ();
        
        //Set input Vars
        ipInput.put('applicationUrl', applicationCallbackURL);
        ipInput.put('applicationToken', applicationToken);
        
        //Call the Integration procedure
        ipOutput = (Map <String, Object>) omnistudio.IntegrationProcedureService.runIntegrationService(procedureName, ipInput, ipOptions);
        
        System.debug('IP Output: ' + ipOutput);
    }
    
    
}