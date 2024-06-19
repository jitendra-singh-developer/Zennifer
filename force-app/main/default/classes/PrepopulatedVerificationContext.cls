public with sharing class PrepopulatedVerificationContext {
    
    @InvocableMethod(label='Prepopulate Verification Context')
    public static List<PrepopulatedVerificationContextResponse> prepopulateVerificationContextData(List<PrepopulatedVerificationContextRequest> verificationContextRequests) {
        
        List<PrepopulatedVerificationContextResponse> responseList = new List<PrepopulatedVerificationContextResponse>();
        PrepopulatedVerificationContextRequest request = verificationContextRequests[0];
        id_verification.VerificationContext context;
        
        if (request.verificationContext == null) {
			return responseList;
        }
        else {
            context = request.verificationContext.clone();
        }
        
        id_verification.SelectedVerifiedResult verifiedResult = context.selectedVerifiedResult;
        id_verification.SelectedSearchResult searchResult = context.selectedSearchResult;
        searchResult.objectName = 'Account';
        searchResult.selectedRecordId = request.accountId;
        
        id_verification.ProcessDefinition processDefinition = context.processDefinition;
        id_verification.ProcessDetail processDetail = processDefinition.processDetail[0];
        id_verification.VerificationProcessFieldList fieldList = processDetail.verificationProcessFieldList;
        List<id_verification.VerificationProcessField> lists = fieldList.verificationProcessFields;
        
        id_verification.SelectedSearchResult selectedSearchResult = new id_verification.SelectedSearchResult();
        selectedSearchResult.objectName = 'Account';
        selectedSearchResult.selectedRecordId = request.accountId;
        
        List<id_verification.FieldValue> selectedRecordObject = new List<id_verification.FieldValue>();
        
        String soqlQuery = 'SELECT Id';
        
        for (id_verification.VerificationProcessField verificationProcessField : lists) {
			soqlQuery += ', ' + String.escapeSingleQuotes(verificationProcessField.fieldName);
        }
        
        soqlQuery += ' FROM Account WHERE Id = \'' + request.accountId + '\'';
        
        System.debug(soqlQuery);
        
        Account selectedAccount = Database.query(soqlQuery);
        
        for (id_verification.VerificationProcessField verificationProcessField : lists) {
            id_verification.FieldValue selectedRecordObjectEntry = new id_verification.FieldValue();
            selectedRecordObjectEntry.developerName = verificationProcessField.developerName;
            System.debug('Field:' + verificationProcessField.dataType);
            switch on verificationProcessField.dataType {
                when 'Text','Email','text' {
                    if(selectedAccount.get(verificationProcessField.fieldName) != null) {
                    	selectedRecordObjectEntry.value = (String)selectedAccount.get(verificationProcessField.fieldName);
                    }
                }
                when 'Address' {
                    if(selectedAccount.get(verificationProcessField.fieldName) != null) {
                    	selectedRecordObjectEntry.value = JSON.serialize(selectedAccount.get(verificationProcessField.fieldName));
                    }
                }
                when 'Birthday', 'DateOnly' {
                    if(selectedAccount.get(verificationProcessField.fieldName) != null) {
                    	selectedRecordObjectEntry.value = String.valueOf(((selectedAccount.get(verificationProcessField.fieldName))));
                        System.debug('Birthday: ' + selectedRecordObjectEntry.value);
                    }
                }
            }
            selectedRecordObject.add(selectedRecordObjectEntry);
        }
        
        selectedSearchResult.selectedRecordObject = selectedRecordObject;
        context.selectedSearchResult = selectedSearchResult;
                                
        PrepopulatedVerificationContextResponse response = new PrepopulatedVerificationContextResponse();
        response.verificationContext = context;
                
        responseList.add(response);
        
        return responseList;
        }
    
    public class PrepopulatedVerificationContextRequest {
        @InvocableVariable
        public Id accountId;
        
        @InvocableVariable
        public id_verification.VerificationContext verificationContext;
    }
    
    public class PrepopulatedVerificationContextResponse {
        @InvocableVariable
        public id_verification.VerificationContext verificationContext;
        
        @InvocableVariable
        public id_verification.VerifiedDetails verifiedDetails;
    }
}