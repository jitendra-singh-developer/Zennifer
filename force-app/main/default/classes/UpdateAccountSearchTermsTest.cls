@isTest
public class UpdateAccountSearchTermsTest {

    @isTest
    public static void testM1(){
        Account testAccount = new Account(
            Name = 'Test Account',
            LLC_BI__lookupKey__c = 'TestSourceId' 
        );
        insert testAccount;
        
        Test.startTest();
            Database.executebatch(new UpdateAccountSearchTerms(),200);
        Test.stopTest();
    }
}