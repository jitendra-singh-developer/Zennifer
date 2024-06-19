/**
 * Reusable functions, formulas, and invocable methods for OmniStudio components
 */
global inherited sharing class OmniFunctions implements Callable {

    /**
     * Enable invocable Data Integration Procedure from Flow
     */
    @InvocableMethod(label = 'Data Integration Procedure')
    global static List<IntegrationProcedureOutput> runIntegrationServiceInvocable(List<IntegrationProcedureInput> input) {
        IntegrationProcedureOutput result = new IntegrationProcedureOutput();
        result.output = JSON.serialize(omnistudio.IntegrationProcedureService.runIntegrationService(
            input[0].procedureAPIName,
            new Map<String, Object> {
                input[0].inputFieldName => input[0].inputFieldValue
            },
            new Map<String, Object>()
        ));

        return new List<IntegrationProcedureOutput> { result };
    }
    global class IntegrationProcedureInput {
        @InvocableVariable(label = 'Procedure Name' required = true) global String procedureAPIName;
        @InvocableVariable(label = 'Input Field Name') global String inputFieldName;
        @InvocableVariable(label = 'Input Field Value') global String inputFieldValue;
    }
    global class IntegrationProcedureOutput {
        @InvocableVariable(label = 'Output') global String output;
    }

    /**
     * Enable custom Function invocable from OmniStudio formulas
     *  @param action - Name of the function
     *  @param args - Map of input, output, and options maps
     *  @return Object - Response true or false if success
     */
    public Object call(String action, Map<String, Object> args) {
        Map<String, Object> input = (Map<String, Object>)args.get('input');
        Map<String, Object> output = (Map<String, Object>)args.get('output');
        Map<String, Object> options = (Map<String, Object>)args.get('options');

        return invokeMethod(action, input, output, options);
    }

    /**
     * Formula Function invocables by function name
     */
    private Boolean invokeMethod(String methodName, Map<String, Object> inputs, Map<String, Object> output, Map<String, Object> options) {
        switch on methodName {
            /**
             * Example Usage: FUNCTION('OmniFunctions','generateUUID')
             */
            when 'generateUUID' {
                output.put('result', generateUUID());
            }
            /**
             * DataRaptor Formula Function: Get item from a list (e.g. from SPLIT() function) using a position index
             * Example Usage: FUNCTION('OmniFunctions','getListItem',SPLIT(FullNameField, " "),0)
             */
            when 'getListItem' {
                List<Object> args = (List<Object>)inputs.get('arguments');
                if (args.size() >= 2 && String.valueOf(args[args.size()-1]).isNumeric()) {
                    output.put('result', args[Integer.valueOf(args[args.size()-1])]);
                } else {
                    output.put('result',null);
                }
            }
            /**
             * Example Usage: FUNCTION('OmniFunctions','getPicklistValueByName','Lead','LeadSource','Web')
             */
            when 'getPicklistValueByName' {
                output.put('result', getPicklistValueByName((List<Object>)inputs.get('arguments')));
            }
            /**
             * Example Usage: FUNCTION('OmniFunctions','listToObject',[{"a":1},{"b":2}])
             */
            when 'listToObject' {
                output.put('result', listToObject((List<Object>)inputs.get('arguments')));
            }
            /**
             * Example Usage: FUNCTION('OmniFunctions','replaceAll','string with  double  spaces','  ',' ')
             */
            when 'replaceAll' {
                output.put('result', replaceAll((List<Object>)inputs.get('arguments')));
            }
            /**
             * Example Usage: FUNCTION('OmniFunctions','removeKeys',%inputObject%,'key1','key2')
             */
            when 'removeKeys' {
                output.put('result', removeKeys((List<Object>)inputs.get('arguments')));
            }
        }
        return true;
    }

    /**
     * Generate a random UUID v4. Typically used for correlaion ID sent in API callouts.
     * FUNCTION('OmniFunctions','generateUUID')
     */
    private String generateUUID() {
        return UUID.randomUUID().toString();
    }

    /**
     * Get a picklist value from its label. Useful for global value sets (e.g. State) to lookup codes.
     * FUNCTION('OmniFunctions','getPicklistValueByName','ObjectAPIName','FieldAPIName',%PicklistLabel%)
     */
    private String getPicklistValueByName(List<Object> arguments) {
        String result;
        String objectName = String.valueOf(arguments[0]);
        String picklistName = String.valueOf(arguments[1]);
        String picklistValueName = String.valueOf(arguments[2]);

        Schema.DescribeSObjectResult objectDescribe = Schema.describeSObjects(new List<String>{objectName})[0];
        Schema.SObjectField picklistField = objectDescribe.fields.getMap().get(picklistName);
        if (picklistField != null) {
            for (Schema.PicklistEntry ple : picklistField.getDescribe().getPicklistValues()) {
                if (ple.getLabel() == picklistValueName) {
                    result = ple.getValue();
                    break;
                }
            }
        }

        return result;
    }

    /**
     * Perform regex capable string replaceAll function
     * FUNCTION('OmniFunctions','replaceAll',%SourceString%,'<string or regex to replace>','<replacement>')
     */
    private String replaceAll(List<Object> arguments) {
        String result;
        String sourceString = String.valueOf(arguments[0]);
        String replacementRegex = String.valueOf(arguments[1]);
        String replacementVal = String.valueOf(arguments[2]);

        if (String.isNotBlank(sourceString) && 
            replacementRegex != null && 
            replacementVal != null) {
                result = sourceString.replaceAll(replacementRegex, replacementVal);
            }
        
        return result;
    }

    /**
     * Combine a List into a single Object (Map).
     * FUNCTION('OmniFunctions','listToObject',%ListObject%)
     */
    private Object listToObject(List<Object> arguments) {
        Map<String, Object> combinedMap = new Map<String, Object>();
        for(Object inputObj : arguments) {
            Map<String,Object> itemObj = (Map<String,Object>)inputObj;
            combinedMap.putAll(itemObj);
        }
        return combinedMap;
    }

    /**
     * Remove JSON object keys, with key names provided as arguments
     * FUNCTION('OmniFunctions','removeKeys',%inputObject%,'key1','key2')
     */
    private Object removeKeys(List<Object> arguments) {
        if (arguments.size() > 1 && arguments[0] instanceOf Map<String,Object>) {
            Map<String, Object> inputMap = (Map<String, Object>)arguments[0];
            arguments.remove(0);
            for (Object keyName : arguments) {
                if (keyName instanceOf String) {
                    inputMap.remove(String.valueOf(keyName));
                }
            }
            return inputMap;
        } else {
            return null;
        }
    }
}