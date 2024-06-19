@isTest
private class PrepopulatedVerificationContextTest {

    @isTest
    static void testPrepopulateVerificationContextData() {
        // Setup data
        Account testAccount = new Account(Name='Test Account');
        insert testAccount;

        id_verification.VerificationContext context = new id_verification.VerificationContext();
        id_verification.SelectedVerifiedResult selectedVerifiedResult = new id_verification.SelectedVerifiedResult();
        context.selectedVerifiedResult = selectedVerifiedResult;

        id_verification.SelectedSearchResult selectedSearchResult = new id_verification.SelectedSearchResult();
        context.selectedSearchResult = selectedSearchResult;

        id_verification.ProcessDefinition processDefinition = new id_verification.ProcessDefinition();
        context.processDefinition = processDefinition;

        id_verification.ProcessDetail processDetail = new id_verification.ProcessDetail();
        List<id_verification.ProcessDetail> processDetails = new List<id_verification.ProcessDetail> { processDetail };
        processDefinition.processDetail = processDetails;

        id_verification.VerificationProcessFieldList fieldList = new id_verification.VerificationProcessFieldList();
        processDetail.verificationProcessFieldList = fieldList;

        id_verification.VerificationProcessField verificationProcessField = new id_verification.VerificationProcessField();
        verificationProcessField.fieldName = 'Name';
        verificationProcessField.developerName = 'Name';
        verificationProcessField.dataType = 'Text';
        List<id_verification.VerificationProcessField> fields = new List<id_verification.VerificationProcessField> { verificationProcessField };
        fieldList.verificationProcessFields = fields;

        List<PrepopulatedVerificationContext.PrepopulatedVerificationContextRequest> requests = new List<PrepopulatedVerificationContext.PrepopulatedVerificationContextRequest>();
            PrepopulatedVerificationContext.PrepopulatedVerificationContextRequest request = new PrepopulatedVerificationContext.PrepopulatedVerificationContextRequest();
            request.accountId = testAccount.Id;
            request.verificationContext =  context;
       requests.add(request);

        // Test method
        List<PrepopulatedVerificationContext.PrepopulatedVerificationContextResponse> results = PrepopulatedVerificationContext.prepopulateVerificationContextData(requests);
        System.assertEquals(1, results.size(), 'Expected 1 response');

		verificationProcessField.dataType = 'Address';
        fields = new List<id_verification.VerificationProcessField> { verificationProcessField };
        fieldList.verificationProcessFields = fields;
        request.accountId = testAccount.Id;
        request.verificationContext =  context;
       	requests.add(request);

        // Test method
        results = PrepopulatedVerificationContext.prepopulateVerificationContextData(requests);
        System.assertEquals(1, results.size(), 'Expected 1 response');

        verificationProcessField.dataType = 'Birthday';
        fields = new List<id_verification.VerificationProcessField> { verificationProcessField };
        fieldList.verificationProcessFields = fields;
        request.accountId = testAccount.Id;
        request.verificationContext =  context;
       	requests.add(request);

        // Test method
        results = PrepopulatedVerificationContext.prepopulateVerificationContextData(requests);
        
        // Verify result
        System.assertEquals(1, results.size(), 'Expected 1 response');
        PrepopulatedVerificationContext.PrepopulatedVerificationContextResponse result = results[0];
        System.assertNotEquals(null, result.verificationContext, 'Expected a non-null verification context');
        System.assertNotEquals(null, result.verificationContext.selectedSearchResult, 'Expected a non-null selected search result');
        System.assertNotEquals(null, result.verificationContext.selectedSearchResult.selectedRecordObject, 'Expected a non-null selected record object');
        System.assertEquals(1, result.verificationContext.selectedSearchResult.selectedRecordObject.size(), 'Expected 1 selected record object');
        id_verification.FieldValue selectedRecordObject = result.verificationContext.selectedSearchResult.selectedRecordObject[0];
    }
}