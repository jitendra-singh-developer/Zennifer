let definition =
      {"states":[{"fields":[],"conditions":{"id":"state-condition-object","isParent":true,"group":[]},"definedActions":{"actions":[]},"name":"Active","isSmartAction":false,"smartAction":{},"styleObject":{"padding":[{"type":"around","size":"xxx-small","label":"around:xxx-small"}],"margin":[],"container":{"class":""},"size":{"isResponsive":false,"default":"12"},"sizeClass":"nds-size_12-of-12 ","class":"nds-p-around_xxx-small ","background":{"color":"","image":"","size":"","repeat":"","position":""},"border":{"type":"","width":"","color":"","radius":"","style":""},"elementStyleProperties":{},"text":{"align":"","color":""},"inlineStyle":"","style":"      \n         "},"components":{"layer-0":{"children":[{"name":"Block","element":"block","size":{"isResponsive":false,"default":"12"},"stateIndex":0,"class":"nds-col ","property":{"label":"\\{Product_Name__c}","collapsible":true,"record":"{record}","collapsedByDefault":false,"card":"{card}","styles":{"label":{"fontSize":"20px","color":"#000000"}}},"type":"block","styleObject":{"padding":[{"type":"bottom","size":"small","label":"bottom:small"},{"type":"top","size":"small","label":"top:small"},{"type":"right","size":"small","label":"right:small"}],"class":"nds-theme_default nds-card nds-border_top nds-border_right nds-border_bottom nds-border_left nds-p-bottom_small nds-p-top_small nds-p-right_small ","sizeClass":"nds-size_12-of-12 ","size":{"isResponsive":false,"default":"12"},"margin":[],"background":{"color":"","image":"","size":"","repeat":"","position":""},"container":{"class":"nds-card"},"border":{"type":["border_top","border_right","border_bottom","border_left"],"width":"1","color":"#cccccc","radius":"5px","style":"solid"},"elementStyleProperties":{"styles":{"label":{"fontSize":"20px","color":"#000000"}}},"text":{"align":"","color":""},"inlineStyle":"","style":"     border-top: #cccccc 1px solid;border-right: #cccccc 1px solid;border-bottom: #cccccc 1px solid;border-left: #cccccc 1px solid; \n    border-radius:5px;     ","theme":"theme_default"},"children":[{"key":"element_element_block_0_0_block_0_0","name":"Block","element":"block","size":{"isResponsive":false,"default":"12"},"stateIndex":0,"class":"nds-col ","property":{"label":"Block","collapsible":false,"record":"{record}","collapsedByDefault":false,"card":"{card}","data-conditions":{"id":"state-condition-object","isParent":true,"group":[{"id":"state-new-condition-9","field":"ServicesAvailable","operator":"==","value":"false","type":"custom","hasMergeField":false}]},"data-preloadConditionalElement":false},"type":"block","styleObject":{"padding":[{"type":"around","size":"x-small","label":"around:x-small"}],"class":"nds-p-around_x-small ","sizeClass":"nds-size_12-of-12 ","margin":[],"background":{"color":"","image":"","size":"","repeat":"","position":""},"size":{"isResponsive":false,"default":"12"},"container":{"class":""},"border":{"type":"","width":"","color":"","radius":"","style":""},"elementStyleProperties":{},"text":{"align":"","color":""},"inlineStyle":"","style":"      \n         "},"children":[{"key":"element_element_element_block_0_0_block_0_0_outputField_0_0","name":"Text","element":"outputField","size":{"isResponsive":false,"default":"12"},"stateIndex":0,"class":"nds-col ","property":{"record":"{record}","mergeField":"%3Cdiv%20class=%22nds-text-align_center%22%3E%3Cspan%20style=%22color:%20#e03e2d;%22%3E%3Cstrong%3E%3Cspan%20style=%22font-size:%2012pt;%22%3ENo%20additional%20service%20available%20for%20this%20product%3C/span%3E%3C/strong%3E%3C/span%3E%3C/div%3E","card":"{card}","data-conditions":{"id":"state-condition-object","isParent":true,"group":[]},"data-preloadConditionalElement":false},"type":"text","styleObject":{"sizeClass":"nds-size_12-of-12"},"parentElementKey":"element_element_block_0_0_block_0_0","elementLabel":"CheckNotFoundMsg","userUpdatedElementLabel":true}],"parentElementKey":"element_block_0_0","elementLabel":"ProdcutBlock-NoAdditionalDetailsFound","userUpdatedElementLabel":true,"styleObjects":[{"key":0,"conditions":"default","styleObject":{"padding":[{"type":"around","size":"x-small","label":"around:x-small"}],"class":"nds-p-around_x-small ","sizeClass":"nds-size_12-of-12 ","margin":[],"background":{"color":"","image":"","size":"","repeat":"","position":""},"size":{"isResponsive":false,"default":"12"},"container":{"class":""},"border":{"type":"","width":"","color":"","radius":"","style":""},"elementStyleProperties":{},"text":{"align":"","color":""},"inlineStyle":"","style":"      \n         "},"label":"Default","name":"Default","conditionString":"","draggable":false}]},{"key":"element_element_block_0_0_block_1_0","name":"Block","element":"block","size":{"isResponsive":false,"default":"12"},"stateIndex":0,"class":"nds-col ","property":{"label":"Block","collapsible":false,"record":"{record}","collapsedByDefault":false,"card":"{card}","data-conditions":{"id":"state-condition-object","isParent":true,"group":[{"id":"state-new-condition-0","field":"ServicesAvailable","operator":"==","value":"true","type":"custom","hasMergeField":false}]},"data-preloadConditionalElement":false},"type":"block","styleObject":{"padding":[{"type":"around","size":"x-small","label":"around:x-small"}],"class":"nds-p-around_x-small ","sizeClass":"nds-size_12-of-12 ","margin":[],"background":{"color":"","image":"","size":"","repeat":"","position":""},"size":{"isResponsive":false,"default":"12"},"container":{"class":""},"border":{"type":"","width":"","color":"","radius":"","style":""},"elementStyleProperties":{},"text":{"align":"","color":""},"inlineStyle":"","style":"      \n         "},"children":[{"key":"element_element_element_block_0_0_block_1_0_outputField_0_0","name":"Text","element":"outputField","size":{"isResponsive":false,"default":"12"},"stateIndex":0,"class":"nds-col ","property":{"record":"{record}","mergeField":"%3Cdiv%20class=%22nds-text-align_center%22%3E%3Cspan%20style=%22color:%20#e03e2d;%22%3E%3Cstrong%3E%3Cspan%20style=%22font-size:%2012pt;%22%3ENo%20%22Check%22%20service%20available%3C/span%3E%3C/strong%3E%3C/span%3E%3C/div%3E","card":"{card}","data-conditions":{"id":"state-condition-object","isParent":true,"group":[{"id":"state-new-condition-0","field":"CheckAvailable","operator":"==","value":"false","type":"custom","hasMergeField":false}]},"data-preloadConditionalElement":false},"type":"text","styleObject":{"sizeClass":"nds-size_12-of-12"},"parentElementKey":"element_element_block_0_0_block_1_0","elementLabel":"CheckNotFoundMsg","userUpdatedElementLabel":true},{"key":"element_element_element_block_0_0_block_1_0_outputField_1_0","name":"Text","element":"outputField","size":{"isResponsive":false,"default":"12"},"stateIndex":0,"class":"nds-col ","property":{"record":"{record}","mergeField":"%3Cdiv%20class=%22nds-text-align_center%22%3E%3Cspan%20style=%22color:%20#e03e2d;%22%3E%3Cstrong%3E%3Cspan%20style=%22font-size:%2012pt;%22%3ENo%20%22Debit%20Card%22%20service%20available%3C/span%3E%3C/strong%3E%3C/span%3E%3C/div%3E","card":"{card}","data-conditions":{"id":"state-condition-object","isParent":true,"group":[{"id":"state-new-condition-0","field":"DebitCardAvailable","operator":"==","value":"false","type":"custom","hasMergeField":false}]},"data-preloadConditionalElement":false},"type":"text","styleObject":{"sizeClass":"nds-size_12-of-12"},"parentElementKey":"element_element_block_0_0_block_1_0","elementLabel":"DebitCardNotFoundMsg","userUpdatedElementLabel":true},{"key":"element_element_element_block_0_0_block_1_0_outputField_2_0","name":"Text","element":"outputField","size":{"isResponsive":false,"default":"12"},"stateIndex":0,"class":"nds-col ","property":{"record":"{record}","mergeField":"%3Cdiv%20class=%22nds-text-align_center%22%3E%3Cspan%20style=%22color:%20#e03e2d;%22%3E%3Cstrong%3E%3Cspan%20style=%22font-size:%2012pt;%22%3ENo%20%22DACA%22%20service%20available%3C/span%3E%3C/strong%3E%3C/span%3E%3C/div%3E","card":"{card}","data-conditions":{"id":"state-condition-object","isParent":true,"group":[{"id":"state-new-condition-0","field":"DACAAvailable","operator":"==","value":"false","type":"custom","hasMergeField":false}]},"data-preloadConditionalElement":false},"type":"text","styleObject":{"sizeClass":"nds-size_12-of-12"},"parentElementKey":"element_element_block_0_0_block_1_0","elementLabel":"DACANotFoundMsg","userUpdatedElementLabel":true},{"key":"element_element_element_block_0_0_block_1_0_outputField_3_0","name":"Text","element":"outputField","size":{"isResponsive":false,"default":"12"},"stateIndex":0,"class":"nds-col ","property":{"record":"{record}","mergeField":"%3Cdiv%20class=%22nds-text-align_center%22%3E%3Cspan%20style=%22color:%20#e03e2d;%22%3E%3Cstrong%3E%3Cspan%20style=%22font-size:%2012pt;%22%3ENo%20%22ESCROW%22%20service%20available%3C/span%3E%3C/strong%3E%3C/span%3E%3C/div%3E","card":"{card}","data-conditions":{"id":"state-condition-object","isParent":true,"group":[{"id":"state-new-condition-0","field":"DACAAvailable","operator":"==","value":"false","type":"custom","hasMergeField":false}]},"data-preloadConditionalElement":false},"type":"text","styleObject":{"sizeClass":"nds-size_12-of-12"},"parentElementKey":"element_element_block_0_0_block_1_0","elementLabel":"ESCROWNotFoundMsg","userUpdatedElementLabel":true}],"parentElementKey":"element_block_0_0","elementLabel":"ProdcutBlock-NoAdditionalDetailsFound","userUpdatedElementLabel":true,"styleObjects":[{"key":0,"conditions":"default","styleObject":{"padding":[{"type":"around","size":"x-small","label":"around:x-small"}],"class":"nds-p-around_x-small ","sizeClass":"nds-size_12-of-12 ","margin":[],"background":{"color":"","image":"","size":"","repeat":"","position":""},"size":{"isResponsive":false,"default":"12"},"container":{"class":""},"border":{"type":"","width":"","color":"","radius":"","style":""},"elementStyleProperties":{},"text":{"align":"","color":""},"inlineStyle":"","style":"      \n         "},"label":"Default","name":"Default","conditionString":"","draggable":false}]},{"key":"element_element_block_0_0_block_2_0","name":"Block","element":"block","size":{"isResponsive":false,"default":"6"},"stateIndex":0,"class":"nds-col ","property":{"label":"Block","collapsible":false,"record":"{record}","collapsedByDefault":false,"card":"{card}","data-conditions":{"id":"state-condition-object","isParent":true,"group":[{"id":"state-new-condition-9","field":"CheckAvailable","operator":"==","value":"true","type":"custom","hasMergeField":false}]},"data-preloadConditionalElement":false},"type":"block","styleObject":{"padding":[{"type":"around","size":"x-small"}],"class":"nds-p-around_x-small","sizeClass":"nds-size_6-of-12 ","size":{"isResponsive":false,"default":"6"}},"children":[{"key":"element_element_element_block_0_0_block_1_0_flexToggle_0_0","name":"Toggle","element":"flexToggle","size":{"isResponsive":false,"default":"12"},"stateIndex":0,"class":"nds-col ","property":{"record":"{record}","card":"{card}","type":"toggle","label":"Check Orders","name":"Check Orders","checked":"\\{Check_Orders__c}","updateDS":true,"disabled":"false","toggleEnabledLabel":"Yes","toggleDisabledLabel":"No","styles":{"label":{"fontFamily":"","fontSize":"14px"}},"action":{"label":"Action","iconName":"standard-default","eventType":"onchange","actionList":[{"key":"1704815476997-w6qgmkk1b","label":"CheckOrderAction","draggable":false,"isOpen":true,"card":"{card}","stateAction":{"id":"flex-action-1704817059837","type":"updateOmniScript","displayName":"Action","vlocityIcon":"standard-default","openUrlIn":"Current Window","elementId":"{Id}","hasExtraParams":true,"extraParams":{"Check_Orders__c":"{Check_Orders__c}","ProductId":"{Id}"}},"actionIndex":0}],"showSpinner":"false"}},"type":"element","styleObject":{"sizeClass":"nds-size_12-of-12","padding":[],"margin":[],"background":{"color":"","image":"","size":"","repeat":"","position":""},"size":{"isResponsive":false,"default":"12"},"container":{"class":""},"border":{"type":"","width":"","color":"","radius":"","style":""},"elementStyleProperties":{"styles":{"label":{"fontFamily":"","fontSize":"14px"}}},"text":{"align":"","color":""},"inlineStyle":""},"parentElementKey":"element_element_block_0_0_block_1_0","elementLabel":"CheckBlock_Check","userUpdatedElementLabel":true,"styleObjects":[{"key":0,"conditions":"default","styleObject":{"sizeClass":"nds-size_12-of-12","padding":[],"margin":[],"background":{"color":"","image":"","size":"","repeat":"","position":""},"size":{"isResponsive":false,"default":"12"},"container":{"class":""},"border":{"type":"","width":"","color":"","radius":"","style":""},"elementStyleProperties":{"styles":{"label":{"fontFamily":"","fontSize":"14px"}}},"text":{"align":"","color":""},"inlineStyle":""},"label":"Default","name":"Default","conditionString":"","draggable":false}]}],"parentElementKey":"element_block_0_0","elementLabel":"CheckBlock","userUpdatedElementLabel":true},{"key":"element_element_block_0_0_block_3_0","name":"Block","element":"block","size":{"isResponsive":false,"default":"6"},"stateIndex":0,"class":"nds-col ","property":{"label":"Block","collapsible":false,"record":"{record}","collapsedByDefault":false,"card":"{card}","data-conditions":{"id":"state-condition-object","isParent":true,"group":[{"id":"state-new-condition-16","field":"DebitCardAvailable","operator":"==","value":"true","type":"custom","hasMergeField":false}]},"data-preloadConditionalElement":false},"type":"block","styleObject":{"padding":[{"type":"around","size":"x-small"}],"class":"nds-p-around_x-small","sizeClass":"nds-size_6-of-12 ","size":{"isResponsive":false,"default":"6"}},"children":[{"key":"element_element_element_block_0_0_block_2_0_flexToggle_0_0","name":"Toggle","element":"flexToggle","size":{"isResponsive":false,"default":"12"},"stateIndex":0,"class":"nds-col ","property":{"record":"{record}","card":"{card}","type":"toggle","label":"Debit Card","name":"Debit Card","checked":"\\{Debit_Card__c}","updateDS":true,"disabled":"false","required":"","toggleEnabledLabel":"Yes","toggleDisabledLabel":"No","styles":{"label":{"fontSize":"14px"}},"action":{"label":"Action","iconName":"standard-default","eventType":"onchange","actionList":[{"key":"1704815541764-cffjl1ppl","label":"DebitCardAction","draggable":false,"isOpen":true,"card":"{card}","stateAction":{"id":"flex-action-1704817073538","type":"updateOmniScript","displayName":"Action","vlocityIcon":"standard-default","openUrlIn":"Current Window","elementId":"{Id}","hasExtraParams":true,"extraParams":{"Debit_Card__c":"{Debit_Card__c}","ProductId":"{Id}"}},"actionIndex":0}],"showSpinner":"false"}},"type":"element","styleObject":{"sizeClass":"nds-size_12-of-12","padding":[],"margin":[],"background":{"color":"","image":"","size":"","repeat":"","position":""},"size":{"isResponsive":false,"default":"12"},"container":{"class":""},"border":{"type":"","width":"","color":"","radius":"","style":""},"elementStyleProperties":{"styles":{"label":{"fontSize":"14px"}}},"text":{"align":"","color":""},"inlineStyle":""},"parentElementKey":"element_element_block_0_0_block_2_0","elementLabel":"DebitCardBlock_DebitCard","userUpdatedElementLabel":true,"styleObjects":[{"key":0,"conditions":"default","styleObject":{"sizeClass":"nds-size_12-of-12","padding":[],"margin":[],"background":{"color":"","image":"","size":"","repeat":"","position":""},"size":{"isResponsive":false,"default":"12"},"container":{"class":""},"border":{"type":"","width":"","color":"","radius":"","style":""},"elementStyleProperties":{"styles":{"label":{"fontSize":"14px"}}},"text":{"align":"","color":""},"inlineStyle":""},"label":"Default","name":"Default","conditionString":"","draggable":false}]}],"parentElementKey":"element_block_0_0","elementLabel":"DebitCardBlock","userUpdatedElementLabel":true},{"key":"element_element_block_0_0_block_4_0","name":"Block","element":"block","size":{"isResponsive":false,"default":"6"},"stateIndex":0,"class":"nds-col ","property":{"label":"Block","collapsible":false,"record":"{record}","collapsedByDefault":false,"card":"{card}","data-conditions":{"id":"state-condition-object","isParent":true,"group":[{"id":"state-new-condition-23","field":"DACAAvailable","operator":"==","value":"true","type":"custom","hasMergeField":false}]},"data-preloadConditionalElement":false},"type":"block","styleObject":{"padding":[{"type":"around","size":"x-small"}],"class":"nds-p-around_x-small","sizeClass":"nds-size_6-of-12 ","size":{"isResponsive":false,"default":"6"}},"children":[{"key":"element_element_element_block_0_0_block_3_0_flexToggle_0_0","name":"Toggle","element":"flexToggle","size":{"isResponsive":false,"default":"12"},"stateIndex":0,"class":"nds-col ","property":{"record":"{record}","card":"{card}","type":"toggle","label":"DACA","name":"DACA","updateDS":true,"checked":"\\{DACA__c}","disabled":"false","toggleEnabledLabel":"Yes","toggleDisabledLabel":"No","styles":{"label":{"fontSize":"14px"}},"action":{"label":"Action","iconName":"standard-default","eventType":"onchange","actionList":[{"key":"1704815568447-pwggtgndp","label":"DACAAction","draggable":false,"isOpen":true,"card":"{card}","stateAction":{"id":"flex-action-1704817087233","type":"updateOmniScript","displayName":"Action","vlocityIcon":"standard-default","openUrlIn":"Current Window","elementId":"{Id}","hasExtraParams":true,"extraParams":{"DACA__c":"{DACA__c}","ProductId":"{Id}"}},"actionIndex":0}],"showSpinner":"false"}},"type":"element","styleObject":{"sizeClass":"nds-size_12-of-12","padding":[],"margin":[],"background":{"color":"","image":"","size":"","repeat":"","position":""},"size":{"isResponsive":false,"default":"12"},"container":{"class":""},"border":{"type":"","width":"","color":"","radius":"","style":""},"elementStyleProperties":{"styles":{"label":{"fontSize":"14px"}}},"text":{"align":"","color":""},"inlineStyle":""},"parentElementKey":"element_element_block_0_0_block_3_0","elementLabel":"DACABlock_DACA","userUpdatedElementLabel":true,"styleObjects":[{"key":0,"conditions":"default","styleObject":{"sizeClass":"nds-size_12-of-12","padding":[],"margin":[],"background":{"color":"","image":"","size":"","repeat":"","position":""},"size":{"isResponsive":false,"default":"12"},"container":{"class":""},"border":{"type":"","width":"","color":"","radius":"","style":""},"elementStyleProperties":{"styles":{"label":{"fontSize":"14px"}}},"text":{"align":"","color":""},"inlineStyle":""},"label":"Default","name":"Default","conditionString":"","draggable":false}]},{"key":"element_element_element_block_0_0_block_3_0_block_1_0","name":"Block","element":"block","size":{"isResponsive":false,"default":"12"},"stateIndex":0,"class":"nds-col ","property":{"label":"Block","collapsible":false,"record":"{record}","collapsedByDefault":false,"card":"{card}","data-conditions":{"id":"state-condition-object","isParent":true,"group":[{"id":"state-new-condition-30","field":"DACA__c","operator":"==","value":"true","type":"custom","hasMergeField":false}]},"data-preloadConditionalElement":false},"type":"block","styleObject":{"padding":[{"type":"around","size":"x-small"}],"class":"nds-p-around_x-small","sizeClass":"nds-size_12-of-12"},"children":[{"key":"element_element_element_element_block_0_0_block_3_0_block_1_0_baseInputElement_0_0","name":"Select","element":"baseInputElement","size":{"isResponsive":false,"default":"12"},"stateIndex":0,"class":"nds-col ","property":{"record":"{record}","type":"combobox","card":"{card}","propertyObj":{"label":"Access Level","type":"combobox","fieldBinding":"{Access_Level__c}","options":[{"label":"No Borrower Access","value":"No Borrower Access","group":"","id":1},{"label":" Borrower Access","value":" Borrower Access","group":"","id":2}],"value":"","placeholder":"Select Access Level...","action":{"label":"Action","iconName":"standard-default","eventType":"onchange","actionList":[{"key":"1704815780388-de24sxvvj","label":"AccessLevelAction","draggable":false,"isOpen":true,"card":"{card}","stateAction":{"id":"flex-action-1704815796894","type":"updateOmniScript","displayName":"Action","vlocityIcon":"standard-default","openUrlIn":"Current Window","elementId":"{Id}","hasExtraParams":true,"extraParams":{"Access_Level__c":"{Access_Level__c}"}},"actionIndex":0}],"showSpinner":"false"}},"styles":{"label":{"color":"","fontSize":"14px"}},"action":{"label":"Action","iconName":"standard-default","eventType":"onchange","actionList":[{"key":"1704815780388-de24sxvvj","label":"AccessLevelAction","draggable":false,"isOpen":true,"card":"{card}","stateAction":{"id":"flex-action-1704815796894","type":"updateOmniScript","displayName":"Action","vlocityIcon":"standard-default","openUrlIn":"Current Window","elementId":"{Id}","hasExtraParams":true,"extraParams":{"Access_Level__c":"{Access_Level__c}"}},"actionIndex":0}],"showSpinner":"false"}},"type":"element","styleObject":{"padding":[{"type":"right","size":"small","label":"right:small"}],"margin":[{"type":"bottom","size":"xx-small","label":"bottom:xx-small"}],"class":"nds-p-right_x-small","sizeClass":"nds-size_12-of-12","background":{"color":"","image":"","size":"","repeat":"","position":""},"size":{"isResponsive":false,"default":"12"},"container":{"class":""},"border":{"type":"","width":"","color":"","radius":"","style":""},"elementStyleProperties":{"styles":{"label":{"color":"","fontSize":"14px"}}},"text":{"align":"","color":""},"inlineStyle":""},"parentElementKey":"element_element_element_block_0_0_block_3_0_block_1_0","elementLabel":"DACABlock-SubBlockAccessLevel","userUpdatedElementLabel":true,"styleObjects":[{"key":0,"conditions":"default","styleObject":{"padding":[{"type":"right","size":"small","label":"right:small"}],"margin":[{"type":"bottom","size":"xx-small","label":"bottom:xx-small"}],"class":"nds-p-right_x-small","sizeClass":"nds-size_12-of-12","background":{"color":"","image":"","size":"","repeat":"","position":""},"size":{"isResponsive":false,"default":"12"},"container":{"class":""},"border":{"type":"","width":"","color":"","radius":"","style":""},"elementStyleProperties":{"styles":{"label":{"color":"","fontSize":"14px"}}},"text":{"align":"","color":""},"inlineStyle":""},"label":"Default","name":"Default","conditionString":"","draggable":false}]},{"key":"element_element_element_element_block_0_0_block_3_0_block_1_0_baseInputElement_1_0","name":"Text","element":"baseInputElement","size":{"isResponsive":false,"default":"12"},"stateIndex":0,"class":"nds-col ","property":{"record":"{record}","type":"text","card":"{card}","propertyObj":{"label":"Secured Creditor Name","fieldBinding":"{Secured_Creditor_Name__c}","value":"","placeholder":"Enter Secured Creditor Name...","maxLength":255,"action":{"label":"Action","iconName":"standard-default","eventType":"onchange","actionList":[{"key":"1704815808234-ccx1qrm4n","label":"SecuredCreditorNameAction","draggable":false,"isOpen":true,"card":"{card}","stateAction":{"id":"flex-action-1704815887094","type":"updateOmniScript","displayName":"Action","vlocityIcon":"standard-default","openUrlIn":"Current Window","elementId":"{Id}","hasExtraParams":true,"extraParams":{"Secured_Creditor_Name__c":"{Secured_Creditor_Name__c}"}},"actionIndex":0}],"showSpinner":"false"}},"styles":{"label":{"fontSize":"14px"}},"action":{"label":"Action","iconName":"standard-default","eventType":"onchange","actionList":[{"key":"1704815808234-ccx1qrm4n","label":"SecuredCreditorNameAction","draggable":false,"isOpen":true,"card":"{card}","stateAction":{"id":"flex-action-1704815887094","type":"updateOmniScript","displayName":"Action","vlocityIcon":"standard-default","openUrlIn":"Current Window","elementId":"{Id}","hasExtraParams":true,"extraParams":{"Secured_Creditor_Name__c":"{Secured_Creditor_Name__c}"}},"actionIndex":0}],"showSpinner":"false"}},"type":"element","styleObject":{"padding":[{"type":"right","size":"small","label":"right:small"}],"margin":[{"type":"bottom","size":"xx-small","label":"bottom:xx-small"}],"class":"nds-p-right_x-small","sizeClass":"nds-size_12-of-12","background":{"color":"","image":"","size":"","repeat":"","position":""},"size":{"isResponsive":false,"default":"12"},"container":{"class":""},"border":{"type":"","width":"","color":"","radius":"","style":""},"elementStyleProperties":{"styles":{"label":{"fontSize":"14px"}}},"text":{"align":"","color":""},"inlineStyle":""},"parentElementKey":"element_element_element_block_0_0_block_3_0_block_1_0","elementLabel":"DACABlock-SubBlock-Secured_Creditor_Name__c","userUpdatedElementLabel":true,"styleObjects":[{"key":0,"conditions":"default","styleObject":{"padding":[{"type":"right","size":"small","label":"right:small"}],"margin":[{"type":"bottom","size":"xx-small","label":"bottom:xx-small"}],"class":"nds-p-right_x-small","sizeClass":"nds-size_12-of-12","background":{"color":"","image":"","size":"","repeat":"","position":""},"size":{"isResponsive":false,"default":"12"},"container":{"class":""},"border":{"type":"","width":"","color":"","radius":"","style":""},"elementStyleProperties":{"styles":{"label":{"fontSize":"14px"}}},"text":{"align":"","color":""},"inlineStyle":""},"label":"Default","name":"Default","conditionString":"","draggable":false}]}],"parentElementKey":"element_element_block_0_0_block_3_0","elementLabel":"DACABlock-SubBlock","userUpdatedElementLabel":true}],"parentElementKey":"element_block_0_0","elementLabel":"DACABlock","userUpdatedElementLabel":true},{"key":"element_element_block_0_0_block_5_0","name":"Block","element":"block","size":{"isResponsive":false,"default":"6"},"stateIndex":0,"class":"nds-col ","property":{"label":"Block","collapsible":false,"record":"{record}","collapsedByDefault":false,"card":"{card}","data-conditions":{"id":"state-condition-object","isParent":true,"group":[{"id":"state-new-condition-0","field":"ESCROWAvailable","operator":"==","value":"true","type":"custom","hasMergeField":false}]},"data-preloadConditionalElement":false},"type":"block","styleObject":{"padding":[{"type":"around","size":"x-small"}],"class":"nds-p-around_x-small","sizeClass":"nds-size_6-of-12 ","size":{"isResponsive":false,"default":"6"}},"children":[{"key":"element_element_element_block_0_0_block_4_0_flexToggle_0_0","name":"Toggle","element":"flexToggle","size":{"isResponsive":false,"default":"12"},"stateIndex":0,"class":"nds-col ","property":{"record":"{record}","card":"{card}","type":"toggle","label":"ESCROW","name":"ESCROW","checked":"\\{ESCROW__c}","updateDS":true,"disabled":"false","toggleEnabledLabel":"Yes","toggleDisabledLabel":"No","styles":{"label":{"fontSize":"14px"}},"action":{"label":"Action","iconName":"standard-default","eventType":"onchange","actionList":[{"key":"1704817385244-s63wbvqie","label":"ESCROWAction","draggable":false,"isOpen":true,"card":"{card}","stateAction":{"id":"flex-action-1704817419978","type":"updateOmniScript","displayName":"Action","vlocityIcon":"standard-default","openUrlIn":"Current Window","elementId":"{Id}","hasExtraParams":true,"extraParams":{"ESCROW__c":"{ESCROW__c}","ProductId":"{Id}"}},"actionIndex":0}],"showSpinner":"false"}},"type":"element","styleObject":{"sizeClass":"nds-size_12-of-12","padding":[],"margin":[],"background":{"color":"","image":"","size":"","repeat":"","position":""},"size":{"isResponsive":false,"default":"12"},"container":{"class":""},"border":{"type":"","width":"","color":"","radius":"","style":""},"elementStyleProperties":{"styles":{"label":{"fontSize":"14px"}}},"text":{"align":"","color":""},"inlineStyle":""},"parentElementKey":"element_element_block_0_0_block_4_0","elementLabel":"ESCROWBlock_ESCROW","userUpdatedElementLabel":true,"styleObjects":[{"key":0,"conditions":"default","styleObject":{"sizeClass":"nds-size_12-of-12","padding":[],"margin":[],"background":{"color":"","image":"","size":"","repeat":"","position":""},"size":{"isResponsive":false,"default":"12"},"container":{"class":""},"border":{"type":"","width":"","color":"","radius":"","style":""},"elementStyleProperties":{"styles":{"label":{"fontSize":"14px"}}},"text":{"align":"","color":""},"inlineStyle":""},"label":"Default","name":"Default","conditionString":"","draggable":false}]}],"parentElementKey":"element_block_0_0","elementLabel":"ESCROWBlock","userUpdatedElementLabel":true}],"elementLabel":"ProdcutBlock","userUpdatedElementLabel":true,"styleObjects":[{"key":0,"conditions":"default","styleObject":{"padding":[{"type":"bottom","size":"small","label":"bottom:small"},{"type":"top","size":"small","label":"top:small"},{"type":"right","size":"small","label":"right:small"}],"class":"nds-theme_default nds-card nds-border_top nds-border_right nds-border_bottom nds-border_left nds-p-bottom_small nds-p-top_small nds-p-right_small ","sizeClass":"nds-size_12-of-12 ","size":{"isResponsive":false,"default":"12"},"margin":[],"background":{"color":"","image":"","size":"","repeat":"","position":""},"container":{"class":"nds-card"},"border":{"type":["border_top","border_right","border_bottom","border_left"],"width":"1","color":"#cccccc","radius":"5px","style":"solid"},"elementStyleProperties":{"styles":{"label":{"fontSize":"20px","color":"#000000"}}},"text":{"align":"","color":""},"inlineStyle":"","style":"     border-top: #cccccc 1px solid;border-right: #cccccc 1px solid;border-bottom: #cccccc 1px solid;border-left: #cccccc 1px solid; \n    border-radius:5px;     ","theme":"theme_default"},"label":"Default","name":"Default","conditionString":"","draggable":false}]}]}},"childCards":[],"actions":[],"omniscripts":[],"documents":[]}],"dataSource":{"type":"DataRaptor","value":{"dsDelay":"","resultVar":"[0]['ApplicationProducts']","bundle":"DAOBusiness_GetApplicationProducts","bundleType":"","inputMap":{"applicationId":"{recordId}"},"jsonMap":"{\"recordId\":\"{recordId}\"}"},"orderBy":{"name":"","isReverse":""},"contextVariables":[]},"title":"DAOProduct_AdditionalDetailsFlexCard_Newport","enableLwc":true,"isFlex":true,"theme":"nds","selectableMode":"Multi","osSupport":true,"multilanguageSupport":false,"listenToWidthResize":true,"lwc":{"DeveloperName":"cfDAOProduct_AdditionalDetailsFlexCard_Newport_1_Gerent","Id":"0Rb780000000qmGCAQ","MasterLabel":"cfDAOProduct_AdditionalDetailsFlexCard_Newport_1_Gerent","NamespacePrefix":"c","ManageableState":"unmanaged"},"Name":"DAOProduct_AdditionalDetailsFlexCard_Newport","uniqueKey":"DAOProduct_AdditionalDetailsFlexCard_Newport_1_Gerent","Id":"0ko78000000GnaPAAS","OmniUiCardKey":"DAOProduct_AdditionalDetailsFlexCard_Newport/Gerent/1.0","OmniUiCardType":"Parent"};
  export default definition