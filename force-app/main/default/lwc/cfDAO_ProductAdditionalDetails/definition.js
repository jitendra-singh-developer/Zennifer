let definition =
      {"states":[{"fields":[],"conditions":{"id":"state-condition-object","isParent":true,"group":[]},"definedActions":{"actions":[]},"name":"Active","isSmartAction":false,"smartAction":{},"styleObject":{"padding":[{"type":"around","size":"x-small","label":"around:x-small"}],"margin":[{"type":"bottom","size":"x-small","label":"bottom:x-small"}],"container":{"class":""},"size":{"isResponsive":false,"default":"4"},"sizeClass":"slds-size_4-of-12 ","class":"slds-p-around_x-small slds-m-bottom_x-small ","background":{"color":"","image":"","size":"","repeat":"","position":""},"border":{"type":"","width":"","color":"","radius":"","style":""},"elementStyleProperties":{},"text":{"align":"","color":""},"inlineStyle":"","style":"      \n         "},"components":{"layer-0":{"children":[{"name":"Block","element":"block","size":{"isResponsive":false,"default":"12"},"stateIndex":0,"class":"slds-col ","property":{"label":"\\{Product_Name__c}","collapsible":true,"record":"{record}","collapsedByDefault":false,"card":"{card}"},"type":"block","styleObject":{"padding":[{"type":"around","size":"x-small","label":"around:x-small"}],"class":"slds-card slds-border_top slds-border_right slds-border_bottom slds-border_left slds-p-around_x-small ","sizeClass":"slds-size_12-of-12 ","size":{"isResponsive":false,"default":"12"},"margin":[],"background":{"color":"","image":"","size":"","repeat":"","position":""},"container":{"class":"slds-card"},"border":{"type":["border_top","border_right","border_bottom","border_left"],"width":"2","color":"#cccccc","radius":"10px","style":"solid"},"elementStyleProperties":{},"text":{"align":"","color":""},"inlineStyle":"","style":"     border-top: #cccccc 2px solid;border-right: #cccccc 2px solid;border-bottom: #cccccc 2px solid;border-left: #cccccc 2px solid; \n    border-radius:10px;     "},"children":[{"key":"element_element_block_0_0_block_0_0","name":"Block","element":"block","size":{"isResponsive":false,"default":12},"stateIndex":0,"class":"slds-col ","property":{"label":"Block","collapsible":false,"record":"{record}","collapsedByDefault":false,"card":"{card}"},"type":"block","styleObject":{"size":{"isResponsive":false,"default":12},"padding":[{"type":"around","size":"x-small","label":"around:x-small"}],"class":"slds-p-around_x-small ","sizeClass":"slds-size_12-of-12 ","margin":[],"background":{"color":"","image":"","size":"","repeat":"","position":""},"container":{"class":""},"border":{"type":"","width":"","color":"","radius":"","style":""},"elementStyleProperties":{},"text":{"align":"","color":""},"inlineStyle":"","style":"      \n         "},"children":[{"key":"element_element_element_block_0_0_block_0_0_outputField_0_0","name":"Text","element":"outputField","size":{"isResponsive":false,"default":"12"},"stateIndex":0,"class":"slds-col ","property":{"record":"{record}","mergeField":"%3Cdiv%20class=%22slds-text-align_center%22%3E%3Cspan%20style=%22color:%20#e03e2d;%22%3E%3Cstrong%3E%3Cspan%20style=%22font-size:%2012pt;%22%3ENo%20check%20option%20available.%3C/span%3E%3C/strong%3E%3C/span%3E%3C/div%3E","card":"{card}","data-conditions":{"id":"state-condition-object","isParent":true,"group":[{"id":"state-new-condition-14","field":"CheckAvailable","operator":"==","value":"false","type":"custom","hasMergeField":false}]},"data-preloadConditionalElement":false},"type":"text","styleObject":{"sizeClass":"slds-size_12-of-12"},"parentElementKey":"element_element_block_0_0_block_0_0","elementLabel":"ProdcutBlock-CreditCardApplicabilityMSG","userUpdatedElementLabel":true},{"key":"element_element_element_block_0_0_block_0_0_outputField_1_0","name":"Text","element":"outputField","size":{"isResponsive":false,"default":"12"},"stateIndex":0,"class":"slds-col ","property":{"record":"{record}","mergeField":"%3Cdiv%20class=%22slds-text-align_center%22%3E%3Cstrong%3E%3Cspan%20style=%22font-size:%2012pt;%20color:%20#e03e2d;%22%3ENo%20debit%20card%20option%20available.%3C/span%3E%3C/strong%3E%3C/div%3E","card":"{card}","data-conditions":{"id":"state-condition-object","isParent":true,"group":[{"id":"state-new-condition-7","field":"DebitCardAvailable","operator":"==","value":"false","type":"custom","hasMergeField":false}]},"data-preloadConditionalElement":false},"type":"text","styleObject":{"sizeClass":"slds-size_12-of-12"},"parentElementKey":"element_element_block_0_0_block_0_0","elementLabel":"ProdcutBlock-DebitCardApplicabilityMSG","userUpdatedElementLabel":true},{"key":"element_element_element_block_0_0_block_0_0_outputField_2_0","name":"Text","element":"outputField","size":{"isResponsive":false,"default":"12"},"stateIndex":0,"class":"slds-col ","property":{"record":"{record}","mergeField":"%3Cdiv%20class=%22slds-text-align_center%22%3E%3Cspan%20style=%22color:%20#e03e2d;%22%3E%3Cstrong%3E%3Cspan%20style=%22font-size:%2012pt;%22%3ENo%20DACA%20option%20available.%3C/span%3E%3C/strong%3E%3C/span%3E%3C/div%3E","card":"{card}","data-conditions":{"id":"state-condition-object","isParent":true,"group":[{"id":"state-new-condition-0","field":"DACAAvailable","operator":"==","value":"false","type":"custom","hasMergeField":false}]},"data-preloadConditionalElement":false},"type":"text","styleObject":{"sizeClass":"slds-size_12-of-12"},"parentElementKey":"element_element_block_0_0_block_0_0","elementLabel":"ProdcutBlock-DACAApplicabilityMSG","userUpdatedElementLabel":true}],"parentElementKey":"element_block_0_0","elementLabel":"ProdcutBlock-NoAdditionalDetailsFound","userUpdatedElementLabel":true,"styleObjects":[{"key":0,"conditions":"default","styleObject":{"size":{"isResponsive":false,"default":12},"padding":[{"type":"around","size":"x-small","label":"around:x-small"}],"class":"slds-p-around_x-small ","sizeClass":"slds-size_12-of-12 ","margin":[],"background":{"color":"","image":"","size":"","repeat":"","position":""},"container":{"class":""},"border":{"type":"","width":"","color":"","radius":"","style":""},"elementStyleProperties":{},"text":{"align":"","color":""},"inlineStyle":"","style":"      \n         "},"label":"Default","name":"Default","conditionString":"","draggable":false}]},{"key":"element_element_block_0_0_block_1_0","name":"Block","element":"block","size":{"isResponsive":false,"default":"6"},"stateIndex":0,"class":"slds-col ","property":{"label":"Block","collapsible":false,"record":"{record}","collapsedByDefault":false,"card":"{card}","data-conditions":{"id":"state-condition-object","isParent":true,"group":[{"id":"state-new-condition-0","field":"CheckAvailable","operator":"==","value":"true","type":"custom","hasMergeField":false}]},"data-preloadConditionalElement":false},"type":"block","styleObject":{"padding":[{"type":"around","size":"x-small"}],"class":"slds-p-around_x-small","sizeClass":"slds-size_6-of-12 ","size":{"isResponsive":false,"default":"6"}},"children":[{"key":"element_element_element_block_0_0_block_1_0_flexToggle_0_0","name":"Toggle","element":"flexToggle","size":{"isResponsive":false,"default":"12"},"stateIndex":0,"class":"slds-col ","property":{"record":"{record}","card":"{card}","type":"toggle","label":"Check Orders ?","name":"Check Orders ?","checked":"\\{Check_Orders__c}","updateDS":true,"toggleEnabledLabel":"Yes","toggleDisabledLabel":"No","disabled":"false","required":"","action":null},"type":"element","styleObject":{"sizeClass":"slds-size_12-of-12"},"parentElementKey":"element_element_block_0_0_block_1_0","elementLabel":"CheckBlock-CheckOrder","userUpdatedElementLabel":true}],"parentElementKey":"element_block_0_0","elementLabel":"CheckBlock","userUpdatedElementLabel":true},{"key":"element_element_block_0_0_block_2_0","name":"Block","element":"block","size":{"isResponsive":false,"default":"6"},"stateIndex":0,"class":"slds-col ","property":{"label":"Block","collapsible":false,"record":"{record}","collapsedByDefault":false,"card":"{card}","data-conditions":{"id":"state-condition-object","isParent":true,"group":[{"id":"state-new-condition-7","field":"DebitCardAvailable","operator":"==","value":"true","type":"custom","hasMergeField":false}]},"data-preloadConditionalElement":false},"type":"block","styleObject":{"padding":[{"type":"around","size":"x-small"}],"class":"slds-p-around_x-small","sizeClass":"slds-size_6-of-12 ","size":{"isResponsive":false,"default":"6"}},"children":[{"key":"element_element_element_block_0_0_block_2_0_flexToggle_0_0","name":"Toggle","element":"flexToggle","size":{"isResponsive":false,"default":"12"},"stateIndex":0,"class":"slds-col ","property":{"record":"{record}","card":"{card}","type":"toggle","label":"Debit Cards ?","name":"Debit Cards ?","checked":"\\{Debit_Card__c}","updateDS":true,"toggleEnabledLabel":"Yes","toggleDisabledLabel":"No","disabled":"false","required":""},"type":"element","styleObject":{"sizeClass":"slds-size_12-of-12"},"parentElementKey":"element_element_block_0_0_block_2_0","elementLabel":"CheckBlock-DebitCards","userUpdatedElementLabel":true}],"parentElementKey":"element_block_0_0","elementLabel":"ProdcutBlock-Block-0-clone-0","userUpdatedElementLabel":true},{"key":"element_element_block_0_0_block_3_0","name":"Block","element":"block","size":{"isResponsive":false,"default":"12"},"stateIndex":0,"class":"slds-col ","property":{"label":"Block","collapsible":false,"record":"{record}","collapsedByDefault":false,"card":"{card}","data-conditions":{"id":"state-condition-object","isParent":true,"group":[{"id":"state-new-condition-14","field":"DACAAvailable","operator":"==","value":"true","type":"custom","hasMergeField":false}]},"data-preloadConditionalElement":false},"type":"block","styleObject":{"padding":[{"type":"around","size":"x-small"}],"class":"slds-p-around_x-small","sizeClass":"slds-size_12-of-12"},"children":[{"name":"Toggle","element":"flexToggle","size":{"isResponsive":false,"default":"6"},"stateIndex":0,"class":"slds-col ","property":{"record":"{record}","card":"{card}","type":"toggle","label":"DACA ?","name":"DACA ?","checked":"\\{DACA__c}","updateDS":true,"toggleEnabledLabel":"Yes","toggleDisabledLabel":"No","disabled":"false","required":""},"type":"element","styleObject":{"sizeClass":"slds-size_6-of-12 ","size":{"isResponsive":false,"default":"6"}},"elementLabel":"CheckBlock-DACA","userUpdatedElementLabel":true,"key":"element_element_element_block_0_0_block_3_0_flexToggle_0_0","parentElementKey":"element_element_block_0_0_block_3_0"},{"name":"Block","element":"block","size":{"isResponsive":false,"default":"12"},"stateIndex":0,"class":"slds-col ","property":{"label":"Block","collapsible":false,"record":"{record}","collapsedByDefault":false,"card":"{card}","data-conditions":{"id":"state-condition-object","isParent":true,"group":[{"id":"state-new-condition-21","field":"DACA__c","operator":"==","value":"true","type":"custom","hasMergeField":false}]},"data-preloadConditionalElement":false},"type":"block","styleObject":{"padding":[{"type":"around","size":"x-small"}],"class":"slds-p-around_x-small","sizeClass":"slds-size_12-of-12 ","size":{"isResponsive":false,"default":"12"}},"children":[{"key":"element_element_element_element_block_0_0_block_3_0_block_1_0_baseInputElement_0_0","name":"Select","element":"baseInputElement","size":{"isResponsive":false,"default":"12"},"stateIndex":0,"class":"slds-col ","property":{"record":"{record}","type":"combobox","card":"{card}","propertyObj":{"label":"Access Level","type":"combobox","fieldBinding":"{Access_Level__c}","placeholder":"Select Access Level...","value":"","options":[{"label":"No Borrower Access","value":"No Borrower Access","group":"","id":0},{"label":"Borrower Access","value":"Borrower Access","group":"","id":1}]}},"type":"element","styleObject":{"padding":[{"type":"right","size":"small"}],"margin":[{"type":"bottom","size":"xx-small"}],"class":"slds-p-right_x-small","sizeClass":"slds-size_12-of-12 ","size":{"isResponsive":false,"default":"12"}},"parentElementKey":"element_element_element_block_0_0_block_3_0_block_1_0","elementLabel":"ProdcutBlock-DACADetails-Access_Level__c","userUpdatedElementLabel":true},{"key":"element_element_element_element_block_0_0_block_3_0_block_1_0_baseInputElement_1_0","name":"Text","element":"baseInputElement","size":{"isResponsive":false,"default":"12"},"stateIndex":0,"class":"slds-col ","property":{"record":"{record}","type":"text","card":"{card}","propertyObj":{"label":"Secured Creditor Name","fieldBinding":"{Secured_Creditor_Name__c}","placeholder":"Enter Secured Creditor Name...","maxLength":255}},"type":"element","styleObject":{"size":{"isResponsive":false,"default":"12"},"padding":[{"type":"right","size":"small"}],"margin":[{"type":"bottom","size":"xx-small"}],"class":"slds-p-right_x-small","sizeClass":"slds-size_12-of-12 "},"parentElementKey":"element_element_element_block_0_0_block_3_0_block_1_0","elementLabel":"ProdcutBlock-DACADetails-Secured_Creditor_Name__c","userUpdatedElementLabel":true}],"elementLabel":"ProdcutBlock-DACADetails","userUpdatedElementLabel":true,"key":"element_element_element_block_0_0_block_3_0_block_1_0","parentElementKey":"element_element_block_0_0_block_3_0"}],"parentElementKey":"element_block_0_0","elementLabel":"ProdcutBlock-Block-1-clone-0","userUpdatedElementLabel":true}],"elementLabel":"ProdcutBlock","userUpdatedElementLabel":true,"styleObjects":[{"key":0,"conditions":"default","styleObject":{"padding":[{"type":"around","size":"x-small","label":"around:x-small"}],"class":"slds-card slds-border_top slds-border_right slds-border_bottom slds-border_left slds-p-around_x-small ","sizeClass":"slds-size_12-of-12 ","size":{"isResponsive":false,"default":"12"},"margin":[],"background":{"color":"","image":"","size":"","repeat":"","position":""},"container":{"class":"slds-card"},"border":{"type":["border_top","border_right","border_bottom","border_left"],"width":"2","color":"#cccccc","radius":"10px","style":"solid"},"elementStyleProperties":{},"text":{"align":"","color":""},"inlineStyle":"","style":"     border-top: #cccccc 2px solid;border-right: #cccccc 2px solid;border-bottom: #cccccc 2px solid;border-left: #cccccc 2px solid; \n    border-radius:10px;     "},"label":"Default","name":"Default","conditionString":"","draggable":false}]}]}},"childCards":[],"actions":[],"omniscripts":[],"documents":[]}],"dataSource":{"type":"DataRaptor","value":{"dsDelay":"","resultVar":"[0]['ApplicationProducts']","bundle":"DAOBusiness_GetApplicationProducts","bundleType":"","inputMap":{"applicationId":"{recordId}"},"jsonMap":"{\"recordId\":\"{recordId}\"}"},"orderBy":{"name":"","isReverse":""},"contextVariables":[]},"title":"DAO_ProductAdditionalDetails","enableLwc":true,"isFlex":true,"theme":"slds","selectableMode":"Multi","lwc":{"DeveloperName":"cfDAO_ProductAdditionalDetails_1_Gerent","Id":"0Rb780000000pa9CAA","MasterLabel":"cfDAO_ProductAdditionalDetails_1_Gerent","NamespacePrefix":"c","ManageableState":"unmanaged"},"uniqueKey":"DAO_ProductAdditionalDetails","isRepeatable":true,"multilanguageSupport":true,"listenToWidthResize":true,"Name":"DAO_ProductAdditionalDetails","Id":"0ko78000000GnSGAA0","OmniUiCardKey":"DAO_ProductAdditionalDetails/Gerent/1.0","OmniUiCardType":"Parent"};
  export default definition