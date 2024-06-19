({
    redirectToTab : function(component, event, helper) {
        var navService = component.find("navService");
        var pageReference = {
            type: "standard__navItemPage",
            attributes: {
                apiName: "DAOPersonal_ProductSelectionTab"
            }
        };
        navService.navigate(pageReference);
    }
})