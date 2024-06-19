@isTest
private class RemoveProductRecordTest {
    
    @isTest
    static void testDeleteSelectedProduct() {
        Application_FINS__c app = new Application_FINS__c();
        insert app;
        
        Application_Product__c testProduct = new Application_Product__c(Name = 'Test Product', Application__c  = app.Id);
        insert testProduct;
        
        Map<String, Object> inputMap = new Map<String, Object>{
            'recId' => testProduct.Id,
            'ApplicationId' => app.Id
        };
        
        Map<String, Object> outMap = new Map<String, Object>();
        Map<String, Object> options = new Map<String, Object>();
        
        Test.startTest();
            RemoveProductRecord removeProduct = new RemoveProductRecord();
            Boolean result = removeProduct.invokeMethod('DeleteSelectedProduct', inputMap, outMap, options);
            
            System.assertEquals(false, result, 'Method should return false');
        Test.stopTest();      
    }
    
    @isTest
    static void testDeleteSelectedProduct1() {
        Application_FINS__c app = new Application_FINS__c();
        insert app;
        
        Application_Product__c testProduct = new Application_Product__c(Name = 'Test Product', Application__c  = app.Id);
        insert testProduct;
        
        Application_Product__c testProduct2 = new Application_Product__c(Name = 'Test Product', Application__c  = app.Id);
        insert testProduct2;
        
        Map<String, Object> inputMap = new Map<String, Object>{
            'recId' => testProduct.Id,
            'ApplicationId' => app.Id
        };
        
        Map<String, Object> outMap = new Map<String, Object>();
        Map<String, Object> options = new Map<String, Object>();
        
        Test.startTest();
            RemoveProductRecord removeProduct = new RemoveProductRecord();
            Boolean result = removeProduct.invokeMethod('DeleteSelectedProduct', inputMap, outMap, options);
            
            System.assertEquals(true, result, 'Method should return true');
        Test.stopTest();       
    }
    
        @isTest
    static void testDeleteSelectedProduct2() {
        Application_FINS__c app = new Application_FINS__c();
        insert app;
        Map<String, Object> inputMap = new Map<String, Object>{
            'ApplicationId' => app.Id
        };
        Map<String, Object> outMap = new Map<String, Object>();
        Map<String, Object> options = new Map<String, Object>();
        Test.startTest();
            RemoveProductRecord removeProduct = new RemoveProductRecord();
            Boolean result = removeProduct.invokeMethod('DeleteSelectedProduct', inputMap, outMap, options);
        Test.stopTest();       
    }
    
     @isTest
    static void testDeleteSelectedProductCatch() {
        Map<String, Object> inputMap = new Map<String, Object>();
        Map<String, Object> outMap = new Map<String, Object>();
        Map<String, Object> options = new Map<String, Object>();
        Test.startTest();
            RemoveProductRecord removeProduct = new RemoveProductRecord();
            Boolean result = removeProduct.invokeMethod('DeleteSelectedProductTest', inputMap, outMap, options);
            System.assertEquals(false, result, 'Method should return false');
        Test.stopTest();       
    }
}