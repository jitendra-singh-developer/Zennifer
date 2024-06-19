/**
* Deletes a specified Application_Product__c record identified by the provided record ID.
* This method is used internally to delete a product record when invoked by the 'DeleteSelectedProduct' method.
* @param recId The ID of the record to be deleted.
* Created by- Wazid Mohammad
*/

global with sharing class RemoveProductRecord implements omnistudio.VlocityOpenInterface {
    
    global Boolean invokeMethod(String methodName, Map<String, Object> inputMap, Map<String, Object> outMap, Map<String, Object> options) {
        Boolean result = true;
        try {
            if (methodName.equals('DeleteSelectedProduct')) {
                String recId = (String) inputMap.get('recId');
                String ApplicationId = (String) inputMap.get('ApplicationId');
                result = DeleteProductRecord(recId, ApplicationId);
                if (!result) {
                    publishErrorEvent();
                }
            }else{
                CalloutException e = new CalloutException();
                e.setMessage('UnDefined Method Called');
                throw e;
            }
        }catch (Exception e) {
            result = false;
            ApexPages.addMessage(new ApexPages.Message(ApexPages.Severity.ERROR, 'Error: ' + e.getMessage()));
        }
        return result;
    }
    
    public static Boolean DeleteProductRecord(String recId, String ApplicationId) {
        List<Application_Product__c> appProd = [SELECT Id FROM Application_Product__c WHERE Application__c = :ApplicationId];
        
        if (appProd.size() == 1 && appProd[0].Id == recId) {
            return false;
        } else if(appProd.size() > 1) {
            delete [SELECT Id FROM Application_Product__c WHERE Id = :recId];
            return true;
        }
        return true;
    }
    public static void publishErrorEvent() {
        try {
            ShowToast__e event = new ShowToast__e(
                ShowToastMessage__c = true
            );
            EventBus.publish(event);
            System.debug('Platform event published successfully');
        } catch (Exception e) {
            System.debug('Exception occurred while publishing platform event: ' + e.getMessage());
        }
    }        
}