/**
 * Custom transformations and OmniStudio helpers for constructing FIS IBS API requests.
 */
global class FISRequestTransformer implements omnistudio.VlocityOpenInterface {

    private static final Integer MAX_INDEX = 99;
    private static Integer currentIndex = 1;

    /**
     * Method to enable OmniStudio (Data Integration Procedure) to perform Remote Action requests for transforming data
     */
    global Boolean invokeMethod(String methodName, Map<String,Object> inputMap, Map<String,Object> outMap, Map<String,Object> options) {            
        Boolean result = true;
        if(methodName.equals('customerReferenceId')) {
            outMap.putAll(transformCustomerReferenceIds(inputMap, new List<String>{'organizationCustomers', 'individualCustomers'}));
        }
        return result;
    }
    
    public static Map<String,Object> transformCustomerReferenceIds(Map<String,Object> payload, List<String> keyList) {
        Map<String, Integer> referenceIdToIndexMap = new Map<String, Integer>();
        
        for (String key : keyList) {
            if (payload.containsKey(key) && payload.get(key) instanceof List<Object>) {
                List<Object> records = (List<Object>)payload.get(key);
                
                for (Object recordObj : records) {
                    if (recordObj instanceof Map<String,Object>) {
                        Map<String,Object> record = (Map<String,Object>)recordObj;
                        String referenceId = (String)record.get('customerReferenceId');
                        
                        if (!referenceIdToIndexMap.containsKey(referenceId)) {
                            referenceIdToIndexMap.put(referenceId, currentIndex);
                            currentIndex = Math.mod(currentIndex,MAX_INDEX) + 1; // Loop back after 99
                        }
                        record.put('customerReferenceId', String.valueOf(referenceIdToIndexMap.get(referenceId)));
                    }
                }
            }
        }
        
        // Update related lists
        updateRelatedLists(payload, referenceIdToIndexMap, 'customerToCustomerRelationships');
        updateRelatedLists(payload, referenceIdToIndexMap, 'emailMaintenance');
        updateRelatedLists(payload, referenceIdToIndexMap, 'customerDueDiligence');

        return payload;
    }
    
    private static void updateRelatedLists(Map<String,Object> payload, Map<String, Integer> referenceIdToIndexMap, String listKey) {
        if (payload.containsKey(listKey) && payload.get(listKey) instanceof List<Object>) {
            List<Object> records = (List<Object>)payload.get(listKey);
            
            for (Object recordObj : records) {
                if (recordObj instanceof Map<String,Object>) {
                    Map<String,Object> record = (Map<String,Object>)recordObj;
                    String referenceId = (String)record.get('customerReferenceId');
                    
                    if (referenceIdToIndexMap.containsKey(referenceId)) {
                        record.put('customerReferenceId', String.valueOf(referenceIdToIndexMap.get(referenceId)));
                    }
                    
                    // Update relatedCustomerReferenceId if present
                    if (record.containsKey('relatedCustomerReferenceId')) {
                        String relatedReferenceId = (String)record.get('relatedCustomerReferenceId');
                        if (referenceIdToIndexMap.containsKey(relatedReferenceId)) {
                            record.put('relatedCustomerReferenceId', String.valueOf(referenceIdToIndexMap.get(relatedReferenceId)));
                        }
                    }
                }
            }
        }
    }
}