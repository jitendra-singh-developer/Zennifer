/**
 * Tests for custom OmniStudio Functions
 */
@isTest
private class OmniFunctionsTest {

    @isTest
    static void testRunIntegrationServiceInvocable() {
        OmniFunctions.IntegrationProcedureInput testFlowInput = new OmniFunctions.IntegrationProcedureInput();
        testFlowInput.procedureAPIName = 'MockDataIntegrationProcedure';
        testFlowInput.inputFieldName = 'recordId';
        testFlowInput.inputFieldValue = 'MockSFID';

        Test.startTest();
        List<OmniFunctions.IntegrationProcedureOutput> testFlowOutput = OmniFunctions.runIntegrationServiceInvocable(
            new List<OmniFunctions.IntegrationProcedureInput>{
                testFlowInput
        });
        Test.stopTest();
        
        System.assert(testFlowOutput != null && testFlowOutput.size() == 1 && testFlowOutput[0] != null, 
            'Invocable output should be generated indicating successful execute'
        );
    }

    @isTest
    static void testGetListItem() {
        //FullNameField == 'A string that is split'
        //FUNCTION('OmniFunctions','getListItem',SPLIT(FullNameField, " "),LISTSIZE(SPLIT(FullNameField, " ")) - 1)
        Map<String,Object> input = new Map<String,Object>{
            'arguments' => new List<String>{
                'A',
                'string',
                'that',
                'is',
                'split',
                '4' //LISTSIZE(SPLIT(FullNameField, " ")) - 1
            }
        };
        Map<String,Object> output = new Map<String,Object>();
        Map<String,Object> options = new Map<String,Object>();
        
        Test.startTest();

        //Call with no args should be no exception
        new OmniFunctions().call('getListItem', new Map<String,Object>{
            'input' => new Map<String,Object>{
                'arguments' => new List<Object>()
            },
            'output' => new Map<String,Object>(),
            'options' => options
        });

        //Call with expected args
        new OmniFunctions().call('getListItem', new Map<String,Object>{
            'input' => input,
            'output' => output,
            'options' => options
        });
        Test.stopTest();

        Object result = output.get('result');
        System.assertEquals('split', result, 'Result should equal that the string argument');
    }

    @isTest
    static void testGenereateUUID() {
        Map<String,Object> input = new Map<String,Object>();
        Map<String,Object> output = new Map<String,Object>();
        Map<String,Object> options = new Map<String,Object>();
        
        Test.startTest();
        new OmniFunctions().call('generateUUID', new Map<String,Object>{
            'input' => input,
            'output' => output,
            'options' => options
        });
        Test.stopTest();

        Object result = output.get('result');
        System.assertNotEquals(null, result, 'Result should be a UUID string');
    }
    
    @isTest
    static void testGetPicklistValueByName() {
        Schema.PicklistEntry picklistValueToTest = Lead.LeadSource.getDescribe().getPicklistValues()[0];
        Map<String,Object> input = new Map<String,Object>{
            'arguments' => new List<String>{
                'Lead',
                'LeadSource',
                picklistValueToTest.getLabel()
            }
        };
        Map<String,Object> output = new Map<String,Object>();
        Map<String,Object> options = new Map<String,Object>();
        
        Test.startTest();
        new OmniFunctions().call('getPicklistValueByName', new Map<String,Object>{
            'input' => input,
            'output' => output,
            'options' => options
        });
        Test.stopTest();

        Object result = output.get('result');
        System.assertEquals(picklistValueToTest.getValue(), result, 'Result should equal the picklist value for Lead.LeadSource:'+picklistValueToTest.getLabel());
    }

    @isTest
    static void testReplaceAll() {
        String sourceString = 'A string with    whitespace ';
        String replacementRegex = '\\s';
        String replacementValue = '';
        Map<String,Object> input = new Map<String,Object>{
            'arguments' => new List<String>{
                sourceString,
                replacementRegex,
                replacementValue
            }
        };
        Map<String,Object> output = new Map<String,Object>();
        Map<String,Object> options = new Map<String,Object>();
        
        Test.startTest();
        new OmniFunctions().call('replaceAll', new Map<String,Object>{
            'input' => input,
            'output' => output,
            'options' => options
        });
        Test.stopTest();

        Object result = output.get('result');
        System.assertEquals(sourceString.replaceAll(replacementRegex, replacementValue), result, 
            'Result should equal the same value as String.replaceAll method');
    }

    @isTest
    static void testListToObject() {
        //List passed into Omni Function will be passed as arguments list
        Map<String,Object> input = new Map<String,Object>{
            'arguments' => new List<Object> {
                new Map<String,Object> {
                    'a' => 1
                },
                new Map<String,Object> {
                    'b' => 2
                }
            }
        };
        Map<String,Object> output = new Map<String,Object>();
        Map<String,Object> options = new Map<String,Object>();
        
        Test.startTest();
        new OmniFunctions().call('listToObject', new Map<String,Object>{
            'input' => input,
            'output' => output,
            'options' => options
        });
        Test.stopTest();

        Object result = output.get('result');
        System.assert(!(result instanceOf List<Object>), 
            'Result should be an object');
    }

    @isTest
    static void testRemoveKeys() {
        //List passed into Omni Function will be passed as arguments list
        String testKeyToRemove = 'a';
        Map<String,Object> input = new Map<String,Object>{
            'arguments' => new List<Object> {
                new Map<String,Object> {
                    testKeyToRemove => 1,
                    'b' => 2
                },
                testKeyToRemove //key to remove
            }
        };
        Map<String,Object> output = new Map<String,Object>();
        Map<String,Object> options = new Map<String,Object>();
        
        Test.startTest();
        //call once with no args make sure no failure
        new OmniFunctions().call('removeKeys', new Map<String,Object>{
            'input' => new Map<String,Object>{
                'arguments' => new List<Object> {}
            },
            'output' => output,
            'options' => options
        });

        //call with expected args
        new OmniFunctions().call('removeKeys', new Map<String,Object>{
            'input' => input,
            'output' => output,
            'options' => options
        });
        Test.stopTest();

        Object result = output.get('result');
        System.assert(result instanceOf Map<String,Object>, 'Result should be an object');
        Map<String,Object> resultMap = (Map<String,Object>)result;
        System.assert(!resultMap.containsKey(testKeyToRemove), 'Output map should not contain the original key to remove');
    }

}