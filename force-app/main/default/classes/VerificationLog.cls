public with sharing class VerificationLog {

    @InvocableMethod(label='Create Verification Log Entry')
    public static List<VerificationLogResponse> createVerificationLog(List<VerificationLogRequest> verificationLogRequests) {        
        
		VerificationLogRequest request = verificationLogRequests[0];
        id_verification.VerifiedResult verifiedResult = request.verifiedResult;
        id_verification.SelectedSearchResult selectedSearchResult = request.selectedSearchResult;
            
        Verification_Log__c verificationLog = new Verification_Log__c();
        verificationLog.Date_of_Interaction__c = System.Datetime.now();
        
        if (selectedSearchResult.objectName == 'Account') {
            verificationLog.Account__c = selectedSearchResult.selectedRecordId;
        }
        
        insert verificationLog;
        
        List<Verification_Log_Detail__c> logDetails = new List<Verification_Log_Detail__c>();        
        
        for (id_verification.Verifier verifier : verifiedResult.requiredVerifiers) {
            Verification_Log_Detail__c logDetail = createLogEntry(verificationLog.Id, verifier, true);
            logDetails.add(logDetail);
        }
        
        for (id_verification.Verifier verifier : verifiedResult.optionalVerifiers) {
            if(verifier.verificationState != '') {
                Verification_Log_Detail__c logDetail = createLogEntry(verificationLog.Id, verifier, false);
                logDetails.add(logDetail);
            }
        }
        
        insert logDetails;
        
		VerificationLogResponse response = new VerificationLogResponse();
        response.verificationLogId = verificationLog.Id;
        
        if (selectedSearchResult.objectName == 'Account') {
        	response.accountId = selectedSearchResult.selectedRecordId;   
        }
        
        List<VerificationLogResponse> responseList = new List<VerificationLogResponse>();
        responseList.add(response);
        return responseList;
	}
    
    @TestVisible
    private static Verification_Log_Detail__c createLogEntry(Id verificationLogId, id_verification.Verifier verifier, Boolean required) {
        Verification_Log_Detail__c newVerificationLogDetail = new Verification_Log_Detail__c();
        newVerificationLogDetail.Required__c = required;
        newVerificationLogDetail.Answered_Correctly__c = Boolean.valueOf(verifier.verificationState);
        newVerificationLogDetail.Verification_Log__c = verificationLogId;
        newVerificationLogDetail.Field__c = verifier.developerName;
        
        return newVerificationLogDetail;
    }
    
    @TestVisible
    public class VerificationLogRequest {
        @InvocableVariable(required=true)
        public id_verification.VerifiedResult verifiedResult;
        
        @InvocableVariable(required=true)
        public id_verification.SelectedSearchResult selectedSearchResult;
    }

	@TestVisible
    public class VerificationLogResponse {
        @InvocableVariable
        public Id verificationLogId;
        
        @InvocableVariable
        public Id accountId;
    }
}