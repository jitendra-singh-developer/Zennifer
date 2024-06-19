let definition =
      {"states":[{"fields":[],"conditions":{"id":"state-condition-object","isParent":true,"group":[]},"definedActions":{"actions":[]},"name":"Active","isSmartAction":false,"smartAction":{},"styleObject":{"padding":[{"type":"around","size":"x-small"}],"margin":[{"type":"bottom","size":"x-small"}],"container":{"class":"nds-card"},"size":{"isResponsive":false,"default":"12"},"sizeClass":"nds-size_12-of-12","class":"nds-card nds-p-around_x-small nds-m-bottom_x-small"},"components":{"layer-0":{"children":[{"name":"Icon","element":"flexIcon","size":{"isResponsive":false,"default":"12"},"stateIndex":0,"class":"nds-col ","property":{"record":"{record}","card":"{card}","iconType":"Salesforce SVG","iconName":"action:new_person_account","size":"medium","extraclass":"slds-icon_container slds-icon-action-new-person-account slds-icon_container--circle","variant":"inverse","imgsrc":""},"type":"element","styleObject":{"sizeClass":"nds-size_12-of-12"},"elementLabel":"Icon-0"},{"name":"Text","element":"outputField","size":{"isResponsive":false,"default":"12"},"stateIndex":0,"class":"nds-col ","property":{"record":"{record}","mergeField":"%3Cdiv%3E%3Cspan%20style=%22font-family:%20'Salesforce%20Sans',%20Arial,%20sans-serif;%20font-size:%2014pt;%20color:%20#236fa1;%22%3EUsers%3C/span%3E%3C/div%3E","card":"{card}"},"type":"text","styleObject":{"sizeClass":"nds-size_12-of-12"},"elementLabel":"Text-1"},{"name":"Datatable","element":"flexDatatable","size":{"isResponsive":false,"default":"12"},"stateIndex":0,"class":"nds-col ","property":{"record":"{record}","card":"{card}","issearchavailable":true,"issortavailable":true,"cellLevelEdit":false,"pagelimit":3,"groupOrder":"asc","columns":[{"fieldName":"Company Name","label":"Company","searchable":true,"sortable":true},{"fieldName":"Name","label":"Name","searchable":true,"sortable":true},{"fieldName":"Role","label":"Role","searchable":true,"sortable":true},{"fieldName":"Username","label":"Username","searchable":true,"sortable":true}],"records":"{records}"},"type":"element","styleObject":{"sizeClass":"nds-size_12-of-12 ","size":{"isResponsive":false,"default":"12"}},"elementLabel":"Datatable-2"}]}},"childCards":[],"actions":[],"omniscripts":[],"documents":[]}],"dataSource":{"type":"DataRaptor","value":{"dsDelay":"","resultVar":"[0]['Service User']","bundle":"DR_TreasuryCompanyFAProduct","bundleType":"","inputMap":{"accountId":"{recordId}"},"jsonMap":"{\"recordId\":\"{recordId}\"}"},"orderBy":{"name":"","isReverse":""},"contextVariables":[]},"title":"TreasuryCompanyServiceUser","enableLwc":true,"isFlex":true,"theme":"nds","selectableMode":"Multi","lwc":{"DeveloperName":"cfTreasuryCompanyServiceUserView_1_Gerent","Id":"0Rb780000000r9aCAA","MasterLabel":"cfTreasuryCompanyServiceUserView_1_Gerent","NamespacePrefix":"c","ManageableState":"unmanaged"},"isRepeatable":false,"events":[{"eventname":"rowclick","channelname":"TreasuryCompanyServiceUser","element":"action","eventtype":"event","recordIndex":"0","actionList":[{"key":"1707195631191-crtxqvu9e","label":"Action","draggable":false,"isOpen":true,"card":"{card}","stateAction":{"id":"flex-action-1707279180448","type":"Custom","displayName":"Action","vlocityIcon":"standard-default","openUrlIn":"New Tab/Window","targetType":"Record","Record":{"targetName":"Service_User__c","targetAction":"view","targetId":"{action.result.Id}"}},"actionIndex":0}],"showSpinner":"false","key":"event-0","displayLabel":"rowclick","eventLabel":"custom event"}],"Name":"TreasuryCompanyServiceUser","uniqueKey":"TreasuryCompanyServiceUser_1_Gerent","Id":"0ko78000000Gnb8AAC","OmniUiCardKey":"TreasuryCompanyServiceUser/Gerent/1.0","OmniUiCardType":"Parent"};
  export default definition