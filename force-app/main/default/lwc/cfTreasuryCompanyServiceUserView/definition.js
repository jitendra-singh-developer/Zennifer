let definition =
      {"states":[{"fields":[],"conditions":{"id":"state-condition-object","isParent":true,"group":[]},"definedActions":{"actions":[]},"name":"Active","isSmartAction":false,"smartAction":{},"styleObject":{"padding":[{"type":"around","size":"x-small"}],"margin":[{"type":"around","size":"none"}],"container":{"class":"nds-card"},"size":{"isResponsive":false,"default":"12"},"sizeClass":"nds-size_12-of-12","class":"nds-card nds-p-around_x-small nds-m-bottom_x-small"},"components":{"layer-0":{"children":[{"name":"Text","element":"outputField","size":{"isResponsive":false,"default":"12"},"stateIndex":0,"class":"nds-col ","property":{"record":"{record}","mergeField":"%3Cdiv%3EID:%20%7BId%7D%3C/div%3E%0A%3Cdiv%3EProduct:%20%7BProduct_Type__c%7D%3C/div%3E","card":"{card}"},"type":"text","styleObject":{"sizeClass":"nds-size_12-of-12"},"elementLabel":"Text-0"},{"name":"Action","element":"action","size":{"isResponsive":false,"default":"12"},"stateIndex":0,"class":"nds-col ","property":{"label":"View","iconName":"standard-default","record":"{record}","card":"{card}","stateObj":"{record}","actionList":[{"stateAction":{"id":"flex-action-1707197462549","type":"Custom","targetType":"Record","openUrlIn":"Current Window","Record":{"targetName":"Account_Product_Financial_Account__c","targetAction":"view","targetId":"{Id}"}},"key":"1707197392726-3xlda337y","label":"View","draggable":true,"isOpen":true,"actionIndex":0}],"showSpinner":"false","displayAsButton":true,"buttonVariant":"outline-brand","hideActionIcon":true,"flyoutDetails":{}},"type":"element","styleObject":{"sizeClass":"nds-size_12-of-12"},"elementLabel":"Action-1"}]}},"childCards":[],"actions":[],"omniscripts":[],"documents":[]}],"dataSource":{"type":"Query","value":{"dsDelay":"","query":"SELECT Id, Product_Type__c  FROM Account_Product_Financial_Account__c WHERE Id='{recordId}'","jsonMap":"{\"recordId\":\"{recordId}\"}","resultVar":""},"orderBy":{"name":"","isReverse":""},"contextVariables":[]},"title":"TreasuryCompanyServiceUserView","enableLwc":true,"isFlex":true,"theme":"nds","selectableMode":"Multi","lwc":{"DeveloperName":"cfTreasuryCompanyServiceUserView_1_Gerent","Id":"0Rb780000000r9aCAA","MasterLabel":"cfTreasuryCompanyServiceUserView_1_Gerent","NamespacePrefix":"c","ManageableState":"unmanaged"},"Name":"TreasuryCompanyServiceUserView","uniqueKey":"TreasuryCompanyServiceUserView","Id":"0ko78000000GnbSAAS","OmniUiCardKey":"TreasuryCompanyServiceUserView/Gerent/1.0","OmniUiCardType":"Child"};
  export default definition