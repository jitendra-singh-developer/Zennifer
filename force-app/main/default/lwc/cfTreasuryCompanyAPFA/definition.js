let definition =
      {"states":[{"fields":[],"conditions":{"id":"state-condition-object","isParent":true,"group":[]},"definedActions":{"actions":[]},"name":"Active","isSmartAction":false,"smartAction":{},"styleObject":{"padding":[{"type":"around","size":"x-small"}],"margin":[{"type":"bottom","size":"x-small"}],"container":{"class":"nds-card"},"size":{"isResponsive":false,"default":"12"},"sizeClass":"nds-size_12-of-12","class":"nds-card nds-p-around_x-small nds-m-bottom_x-small"},"components":{"layer-0":{"children":[{"name":"Block","element":"block","size":{"isResponsive":false,"default":"12"},"stateIndex":0,"class":"nds-col ","property":{"label":"\\{FinancialAccountName} ({FinancialAccountNumber}) : {Product}","collapsible":true,"record":"{record}","collapsedByDefault":false,"card":"{card}","action":{"label":"Action","iconName":"standard-default","eventType":"onclick","actionList":[{"key":"1707350927850-dfuncl5uj","label":"View","draggable":false,"isOpen":true,"card":"{card}","stateAction":{"id":"flex-action-1707352433719","type":"Custom","displayName":"Action","vlocityIcon":"standard-default","targetType":"Record","openUrlIn":"New Tab/Window","Record":{"targetName":"Account_Product_Financial_Account__c","targetAction":"view","targetId":"{APFAID}"}},"actionIndex":0}],"showSpinner":"false"}},"type":"block","styleObject":{"padding":[{"type":"around","size":"x-small"}],"class":"nds-p-around_x-small","sizeClass":"nds-size_12-of-12 ","size":{"isResponsive":false,"default":"12"}},"children":[{"name":"Field","element":"outputField","size":{"isResponsive":false,"default":"2"},"stateIndex":0,"class":"nds-col ","property":{"placeholder":"output","record":"{record}","type":"currency","card":"{card}","fieldName":"ACHDebitExposureLimit","label":"ACH Debit Exposure Limit","locale":"en-US","currency":"USD","styles":{"label":{"textAlign":"left"}}},"type":"element","styleObject":{"sizeClass":"nds-size_2-of-12 ","size":{"isResponsive":false,"default":"2"},"padding":[],"margin":[],"background":{"color":"","image":"","size":"","repeat":"","position":""},"container":{"class":""},"border":{"type":"","width":"","color":"","radius":"","style":""},"elementStyleProperties":{"styles":{"label":{"textAlign":"left"}}},"text":{"align":"","color":""},"inlineStyle":""},"elementLabel":"Block-0-Field-3","styleObjects":[{"key":0,"conditions":"default","styleObject":{"sizeClass":"nds-size_2-of-12 ","size":{"isResponsive":false,"default":"2"},"padding":[],"margin":[],"background":{"color":"","image":"","size":"","repeat":"","position":""},"container":{"class":""},"border":{"type":"","width":"","color":"","radius":"","style":""},"elementStyleProperties":{"styles":{"label":{"textAlign":"left"}}},"text":{"align":"","color":""},"inlineStyle":""},"label":"Default","name":"Default","conditionString":"","draggable":false}],"key":"element_element_block_0_0_outputField_0_0","parentElementKey":"element_block_0_0"},{"name":"Field","element":"outputField","size":{"isResponsive":false,"default":"2"},"stateIndex":0,"class":"nds-col ","property":{"placeholder":"output","record":"{record}","type":"currency","card":"{card}","fieldName":"ACHCreditExposureLimit","label":"ACH Credit Exposure Limit","locale":"en-US","currency":"USD","styles":{"label":{"textAlign":"left"}}},"type":"element","styleObject":{"sizeClass":"nds-size_2-of-12 ","size":{"isResponsive":false,"default":"2"},"padding":[],"margin":[],"background":{"color":"","image":"","size":"","repeat":"","position":""},"container":{"class":""},"border":{"type":"","width":"","color":"","radius":"","style":""},"elementStyleProperties":{"styles":{"label":{"textAlign":"left"}}},"text":{"align":"","color":""},"inlineStyle":""},"elementLabel":"Block-0-Field-2","styleObjects":[{"key":0,"conditions":"default","styleObject":{"sizeClass":"nds-size_2-of-12 ","size":{"isResponsive":false,"default":"2"},"padding":[],"margin":[],"background":{"color":"","image":"","size":"","repeat":"","position":""},"container":{"class":""},"border":{"type":"","width":"","color":"","radius":"","style":""},"elementStyleProperties":{"styles":{"label":{"textAlign":"left"}}},"text":{"align":"","color":""},"inlineStyle":""},"label":"Default","name":"Default","conditionString":"","draggable":false}],"key":"element_element_block_0_0_outputField_1_0","parentElementKey":"element_block_0_0"},{"name":"Field","element":"outputField","size":{"isResponsive":false,"default":"2"},"stateIndex":0,"class":"nds-col ","property":{"placeholder":"output","record":"{record}","type":"currency","card":"{card}","fieldName":"MobileDepositLimit","label":"Mobile Deposit Limit","locale":"en-US","currency":"USD","styles":{"label":{"textAlign":"left","textDecoration":"#3A6D9D"}}},"type":"element","styleObject":{"sizeClass":"nds-size_2-of-12 ","size":{"isResponsive":false,"default":"2"},"padding":[],"margin":[],"background":{"color":"","image":"","size":"","repeat":"","position":""},"container":{"class":""},"border":{"type":"","width":"","color":"","radius":"","style":""},"elementStyleProperties":{"styles":{"label":{"textAlign":"left","textDecoration":"#3A6D9D"}}},"text":{"align":"","color":""},"inlineStyle":""},"elementLabel":"Block-0-Field-1","styleObjects":[{"key":0,"conditions":"default","styleObject":{"sizeClass":"nds-size_2-of-12 ","size":{"isResponsive":false,"default":"2"},"padding":[],"margin":[],"background":{"color":"","image":"","size":"","repeat":"","position":""},"container":{"class":""},"border":{"type":"","width":"","color":"","radius":"","style":""},"elementStyleProperties":{"styles":{"label":{"textAlign":"left","textDecoration":"#3A6D9D"}}},"text":{"align":"","color":""},"inlineStyle":""},"label":"Default","name":"Default","conditionString":"","draggable":false}],"key":"element_element_block_0_0_outputField_2_0","parentElementKey":"element_block_0_0"},{"name":"Field","element":"outputField","size":{"isResponsive":true,"default":"2","large":"2","medium":"2","small":"2"},"stateIndex":0,"class":"nds-col ","property":{"placeholder":"output","record":"{record}","type":"currency","card":"{card}","fieldName":"RDCLimit","label":"RDC Limit","locale":"en-US","currency":"USD","styles":{"label":{"textAlign":"left"}}},"type":"element","styleObject":{"sizeClass":"nds-large-size_2-of-12 nds-medium-size_2-of-12 nds-small-size_2-of-12 nds-size_2-of-12 ","size":{"isResponsive":true,"default":"2","large":"2","medium":"2","small":"2"},"padding":[],"margin":[],"background":{"color":"","image":"","size":"","repeat":"","position":""},"container":{"class":""},"border":{"type":"","width":"","color":"","radius":"","style":""},"elementStyleProperties":{"styles":{"label":{"textAlign":"left"}}},"text":{"align":"","color":""},"inlineStyle":"","class":"nds-theme_default ","style":"      \n         ","theme":"theme_default"},"elementLabel":"Block-0-Field-0","styleObjects":[{"key":0,"conditions":"default","styleObject":{"sizeClass":"nds-large-size_2-of-12 nds-medium-size_2-of-12 nds-small-size_2-of-12 nds-size_2-of-12 ","size":{"isResponsive":true,"default":"2","large":"2","medium":"2","small":"2"},"padding":[],"margin":[],"background":{"color":"","image":"","size":"","repeat":"","position":""},"container":{"class":""},"border":{"type":"","width":"","color":"","radius":"","style":""},"elementStyleProperties":{"styles":{"label":{"textAlign":"left"}}},"text":{"align":"","color":""},"inlineStyle":"","class":"nds-theme_default ","style":"      \n         ","theme":"theme_default"},"label":"Default","name":"Default","conditionString":"","draggable":false}],"key":"element_element_block_0_0_outputField_3_0","parentElementKey":"element_block_0_0"}],"elementLabel":"Block-0"},{"name":"Datatable","element":"flexDatatable","size":{"isResponsive":false,"default":"12"},"stateIndex":0,"class":"nds-col ","property":{"record":"{record}","card":"{card}","issearchavailable":"false","issortavailable":"true","records":"{records}","columns":[{"fieldName":"Name","label":"Name","searchable":false,"sortable":true,"type":"text"},{"fieldName":"BOCCompanyId","label":"BOCCompanyId","searchable":false,"sortable":true,"type":"text"},{"fieldName":"Company ID","label":"Company ID","searchable":false,"sortable":true,"type":"text"}]},"type":"element","styleObject":{"sizeClass":"nds-size_12-of-12"},"elementLabel":"Datatable-1"},{"name":"Datatable","element":"flexDatatable","size":{"isResponsive":false,"default":"12"},"stateIndex":0,"class":"nds-col ","property":{"record":"{record}","card":"{card}","issearchavailable":false,"issortavailable":true,"cellLevelEdit":true,"pagelimit":3,"groupOrder":"asc","columns":[],"records":"{records}"},"type":"element","styleObject":{"sizeClass":"nds-size_12-of-12"},"elementLabel":"Datatable-2"}]}},"childCards":[],"actions":[],"omniscripts":[],"documents":[]}],"dataSource":{"type":"DataRaptor","value":{"dsDelay":"","resultVar":"[0]['Company']","bundle":"DR_GetTreasuryCompanyProductFA","bundleType":"","inputMap":{"accountId":"0017800000PsFcXAAV"},"jsonMap":"{\"accountId\":\"{accountId}\"}"},"orderBy":{"name":"","isReverse":""},"contextVariables":[]},"title":"TreasuryCompanyAPFA","enableLwc":true,"isFlex":true,"theme":"nds","selectableMode":"Multi","lwc":{"DeveloperName":"cfTreasuryCompanyUser_1_Gerent","Id":"0Rb780000000rEoCAI","MasterLabel":"cfTreasuryCompanyUser_1_Gerent","NamespacePrefix":"c","ManageableState":"unmanaged"},"isRepeatable":true,"events":[],"Name":"TreasuryCompanyAPFA","uniqueKey":"TreasuryCompanyAPFA","Id":"0ko78000000GncVAAS","OmniUiCardKey":"TreasuryCompanyAPFA/Gerent/1.0","OmniUiCardType":"Child"};
  export default definition