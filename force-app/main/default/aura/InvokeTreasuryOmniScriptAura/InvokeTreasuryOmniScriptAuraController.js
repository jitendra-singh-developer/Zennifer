({
	doInit : function(component, event, helper) {
		var recordId = component.get("v.recordId");
        console.log('recordId', recordId);
        let prefill={};
        prefill.ContextId = recordId;
        
        component.set('v.prefill', prefill);
        console.log('prefill obj',prefill);
	}
})