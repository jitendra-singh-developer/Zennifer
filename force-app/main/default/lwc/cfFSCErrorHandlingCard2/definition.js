let definition =
      {"states":[{"fields":[],"conditions":{"id":"state-condition-object","isParent":true,"group":[{"id":"state-new-condition-9","field":"hasErrors","operator":"==","value":"true","type":"custom","hasMergeField":false}]},"definedActions":{"actions":[]},"name":"Active","isSmartAction":false,"smartAction":{},"styleObject":{"padding":[{"type":"around","size":"x-small","label":"around:x-small"}],"margin":[{"type":"around","size":"none","label":"around:none"}],"container":{"class":""},"size":{"isResponsive":false,"default":"12"},"sizeClass":"slds-size_12-of-12 ","class":"slds-p-around_x-small slds-m-around_none ","background":{"color":"","image":"","size":"","repeat":"","position":""},"border":{"type":"","width":"","color":"","radius":"","style":""},"elementStyleProperties":{},"text":{"align":"","color":""},"inlineStyle":"","style":"      \n         "},"components":{"layer-0":{"children":[{"name":"Block","element":"block","size":{"isResponsive":false,"default":"12"},"stateIndex":0,"class":"slds-col ","property":{"label":"Block","collapsible":false,"record":"{record}","collapsedByDefault":false,"card":"{card}","data-conditions":{"id":"state-condition-object","isParent":true,"group":[]}},"type":"block","styleObject":{"padding":[{"type":"around","size":"x-small","label":"around:x-small"}],"class":"slds-p-around_x-small ","sizeClass":"slds-size_12-of-12 ","margin":[],"background":{"color":"#fef1ee","image":"","size":"","repeat":"","position":""},"size":{"isResponsive":false,"default":"12"},"container":{"class":""},"border":{"type":"","width":"","color":"","radius":"","style":""},"elementStyleProperties":{},"text":{"align":"","color":""},"inlineStyle":"","style":"background-color:#fef1ee;      \n         "},"children":[{"key":"element_element_block_0_0_outputField_0_0","name":"Text","element":"outputField","size":{"isResponsive":false,"default":"11"},"stateIndex":0,"class":"slds-col ","property":{"record":"{record}","mergeField":"%3Cdiv%3E%7BerrorMessage%7D%3C/div%3E","card":"{card}"},"type":"text","styleObject":{"sizeClass":"slds-size_11-of-12 ","size":{"isResponsive":false,"default":"11"},"padding":[],"margin":[],"background":{"color":"","image":"","size":"","repeat":"","position":""},"container":{"class":""},"border":{"type":"","width":"","color":"","radius":"","style":""},"elementStyleProperties":{},"text":{"align":"center","color":"#d25c60"},"inlineStyle":"","class":"slds-text-align_center ","style":"      \n        color:#d25c60; "},"parentElementKey":"element_block_0_0","elementLabel":"Block-0-Text-0","styleObjects":[{"key":0,"conditions":"default","styleObject":{"sizeClass":"slds-size_11-of-12 ","size":{"isResponsive":false,"default":"11"},"padding":[],"margin":[],"background":{"color":"","image":"","size":"","repeat":"","position":""},"container":{"class":""},"border":{"type":"","width":"","color":"","radius":"","style":""},"elementStyleProperties":{},"text":{"align":"center","color":"#d25c60"},"inlineStyle":"","class":"slds-text-align_center ","style":"      \n        color:#d25c60; "},"label":"Default","name":"Default","conditionString":"","draggable":false}]},{"name":"Icon","element":"flexIcon","size":{"isResponsive":false,"default":"1"},"stateIndex":0,"class":"slds-col ","property":{"record":"{record}","card":"{card}","color":"#d25c60","iconType":"Salesforce SVG","iconName":"utility:close","size":"x-small","extraclass":"slds-icon_container slds-icon__svg--default ","variant":"inverse","imgsrc":"","action":{"label":"Action","iconName":"standard-default","eventType":"onclick","actionList":[{"key":"1654215533076-3mpwqjown","label":"Close","draggable":false,"isOpen":true,"card":"{card}","stateAction":{"id":"flex-action-1654237182156","type":"cardAction","displayName":"Action","vlocityIcon":"standard-default","openUrlIn":"Current Window","eventName":"setValues","subType":"Custom","bubbles":true,"composed":true,"fieldValues":[{"fieldName":"hasErrors","fieldValue":"false"}]},"actionIndex":0}],"showSpinner":"false"}},"type":"element","styleObject":{"sizeClass":"slds-size_1-of-12 ","padding":[],"margin":[],"background":{"color":"","image":"","size":"","repeat":"","position":""},"size":{"isResponsive":false,"default":"1"},"container":{"class":""},"border":{"type":"","width":"","color":"","radius":"","style":""},"elementStyleProperties":{"color":"#d25c60"},"text":{"align":"right","color":""},"inlineStyle":"","class":"slds-text-align_right ","style":"      \n         "},"elementLabel":"Icon-1","styleObjects":[{"key":0,"conditions":"default","styleObject":{"sizeClass":"slds-size_1-of-12 ","padding":[],"margin":[],"background":{"color":"","image":"","size":"","repeat":"","position":""},"size":{"isResponsive":false,"default":"1"},"container":{"class":""},"border":{"type":"","width":"","color":"","radius":"","style":""},"elementStyleProperties":{"color":"#d25c60"},"text":{"align":"right","color":""},"inlineStyle":"","class":"slds-text-align_right ","style":"      \n         "},"label":"Default","name":"Default","conditionString":"","draggable":false}],"key":"element_element_block_0_0_flexIcon_1_0","parentElementKey":"element_block_0_0"}],"elementLabel":"Block-0","styleObjects":[{"key":0,"conditions":"default","styleObject":{"padding":[{"type":"around","size":"x-small","label":"around:x-small"}],"class":"slds-p-around_x-small ","sizeClass":"slds-size_12-of-12 ","margin":[],"background":{"color":"#fef1ee","image":"","size":"","repeat":"","position":""},"size":{"isResponsive":false,"default":"12"},"container":{"class":""},"border":{"type":"","width":"","color":"","radius":"","style":""},"elementStyleProperties":{},"text":{"align":"","color":""},"inlineStyle":"","style":"background-color:#fef1ee;      \n         "},"label":"Default","name":"Default","conditionString":"","draggable":false}]}]}},"childCards":[],"actions":[],"omniscripts":[],"documents":[]}],"dataSource":{"type":"Custom","value":{"dsDelay":"","body":"{\n    \"hasErrors\":\"true\",\n    \"errorMessage\":\"Something went wrong. Please try again.\"\n}","resultVar":""},"orderBy":{"name":"","isReverse":""},"contextVariables":[]},"title":"FSCErrorHandlingCard22","enableLwc":true,"isFlex":true,"theme":"slds","selectableMode":"Multi","lwc":{"DeveloperName":"cfFSCErrorHandlingCard2_1_Salesforce","Id":"0Rb780000000n88CAA","MasterLabel":"cfFSCErrorHandlingCard2_1_Salesforce","NamespacePrefix":"c","ManageableState":"unmanaged"},"Name":"FSCErrorHandlingCard2","uniqueKey":"FSCErrorHandlingCard2","Id":"0ko78000000GnADAA0","OmniUiCardKey":"FSCErrorHandlingCard2/Salesforce/1.0","OmniUiCardType":"Child"};
  export default definition