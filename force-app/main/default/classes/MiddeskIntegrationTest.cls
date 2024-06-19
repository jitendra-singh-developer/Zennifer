@istest
public class MiddeskIntegrationTest {
	@isTest static void testMiddeskIntegration() {
		RestRequest req = new RestRequest(); 
        RestResponse res = new RestResponse();             
        req.requestURI = '/services/apexrest//MiddeskIntegration/Webhook';
        req.httpMethod = 'POST';
        String token= '12442132231213123';
        req.requestBody=Blob.valueof('{"data":{"_links":{"journey_application":{"href":"www.google.com"},"journey_application_token":"'+token+'"},"journey_application_token":"'+token+'"},"journey_application_token":"'+token+'"}');
        RestContext.request = req;
        RestContext.response= res;
        String returnValue = MiddeskIntegration.getTokenFromWebhook();
        System.assertEquals(returnValue, 'Success', '');
    }
}