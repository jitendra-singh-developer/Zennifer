let definition =
      {"states":[{"fields":[],"conditions":{"id":"state-condition-object","isParent":true,"group":[]},"definedActions":{"actions":[]},"name":"Active","isSmartAction":false,"smartAction":{},"styleObject":{"padding":[{"type":"around","size":"x-small","label":"around:x-small"}],"margin":[{"type":"bottom","size":"x-small","label":"bottom:x-small"}],"container":{"class":""},"size":{"isResponsive":false,"default":"12"},"sizeClass":"nds-size_12-of-12 ","class":"nds-p-around_x-small nds-m-bottom_x-small ","background":{"color":"","image":"","size":"","repeat":"","position":""},"border":{"type":"","width":"","color":"","radius":"","style":""},"elementStyleProperties":{},"text":{"align":"","color":""},"inlineStyle":"","style":"      \n         "},"components":{"layer-0":{"children":[{"name":"Block","element":"block","size":{"isResponsive":false,"default":"12"},"stateIndex":0,"class":"nds-col ","property":{"label":"Help Texts","collapsible":true,"record":"{record}","collapsedByDefault":false,"card":"{card}"},"type":"block","styleObject":{"padding":[{"type":"around","size":"x-small"}],"class":"nds-p-around_x-small","sizeClass":"nds-size_12-of-12"},"children":[{"key":"element_element_block_0_0_outputField_0_0","name":"Text","element":"outputField","size":{"isResponsive":false,"default":"12"},"stateIndex":0,"class":"nds-col ","property":{"record":"{record}","mergeField":"%3Cdiv%3EType&nbsp;%20:-%20%7BParent.CaseType%7D%3C/div%3E%0A%3Cdiv%3ESub%20Type%20:%20-%20%7BParent.CaseSubType%7D%3C/div%3E%0A%3Cdiv%3ERecord%20:-%20%7BParent.recordId%7D%3C/div%3E","card":"{card}"},"type":"text","styleObject":{"sizeClass":"nds-size_12-of-12"},"parentElementKey":"element_block_0_0","elementLabel":"HelpTextBlock-Text-0"},{"key":"element_element_block_0_0_block_1_0","name":"Block","element":"block","size":{"isResponsive":false,"default":"12"},"stateIndex":0,"class":"nds-col ","property":{"label":"Block","collapsible":false,"record":"{record}","collapsedByDefault":false,"card":"{card}"},"type":"block","styleObject":{"padding":[{"type":"around","size":"x-small"}],"class":"nds-p-around_x-small","sizeClass":"nds-size_12-of-12"},"children":[{"key":"element_element_element_block_0_0_block_1_0_outputField_0_0","name":"Text","element":"outputField","size":{"isResponsive":false,"default":"12"},"stateIndex":0,"class":"nds-col ","property":{"record":"{record}","mergeField":"%3Ch4%3E%7BHelpText%7D%3C/h4%3E","card":"{card}"},"type":"text","styleObject":{"sizeClass":"nds-size_12-of-12"},"parentElementKey":"element_element_block_0_0_block_1_0","elementLabel":"HelpTextMSG-Text-0"}],"parentElementKey":"element_block_0_0","elementLabel":"HelpTextMSG","userUpdatedElementLabel":true}],"elementLabel":"HelpTextBlock","userUpdatedElementLabel":true}]}},"childCards":[],"actions":[],"omniscripts":[],"documents":[]}],"dataSource":{"type":"IntegrationProcedures","value":{"interval":"2000","dsDelay":"","ipMethod":"Case_GetHelpText","vlocityAsync":false,"inputMap":{"CaseSubType":"{Parent.CaseSubType}","CaseType":"{Parent.CaseType}","recordId":"{Parent.recordId}"},"jsonMap":"{\"Parent.CaseSubType\":\"{Parent.CaseSubType}\",\"Parent.CaseType\":\"{Parent.CaseType}\",\"Parent.recordId\":\"{Parent.recordId}\"}","resultVar":""},"orderBy":{"name":"","isReverse":""},"contextVariables":[]},"title":"CaseHelpTexts_Newport","enableLwc":true,"isFlex":true,"theme":"nds","selectableMode":"Multi","lwc":{"DeveloperName":"cfCaseHelpTexts_Newport_4_Gerent","Id":"0Rb780000000rJZCAY","MasterLabel":"cfCaseHelpTexts_Newport_4_Gerent","NamespacePrefix":"c","ManageableState":"unmanaged"},"isRepeatable":false,"multilanguageSupport":true,"listenToWidthResize":true,"osSupport":true,"Name":"CaseHelpTexts_Newport","uniqueKey":"CaseHelpTexts_Newport_4_Gerent","Id":"0ko78000000GndEAAS","OmniUiCardKey":"CaseHelpTexts_Newport/Gerent/4.0","OmniUiCardType":"Parent"};
  export default definition