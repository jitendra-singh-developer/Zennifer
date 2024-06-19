({
	doInit : function(component, event, helper) {
		var recordId = component.get("v.recordId");
        var objectApiName = component.get("v.sObjectName");
        console.log('recordId', recordId);
        let prefill={};
        prefill.ContextId = recordId;
        prefill.ObjectApiName = objectApiName;
        
        component.set('v.prefill', prefill);
        console.log('prefill obj',prefill);
	}
})