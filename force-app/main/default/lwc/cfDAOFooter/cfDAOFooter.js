import { LightningElement, api } from "lwc";
export default class cfDAOFooter extends LightningElement {
    @api recordId;
	@api objectApiName;
	@api theme;
	@api orgNsPrefix;
	@api sessionVars;
	@api searchParam;
	@api obj;
	@api isRecursive;
	@api debug;
	@api isChildCardTrackingEnabled;
	@api trackingObj;
	@api testParams;
	@api size;
	@api records;
	@api cardNode;
	@api parentData;
	@api parentUniquekey;
	@api isInsideParent;
	@api parentRecord;
	@api parentRecords;
	@api parentAttribute;
	@api parentMergefields;
	@api listenOsDataChange;
	@api omniJsonData;
    @api get cfLogo() {
    return this.runtimeWrapper?.getExposedAttribute("cfLogo");
  }
  set cfLogo(val) {
    this.runtimeWrapper?.updateExposedAttributes("cfLogo", val);
  };

@api get cfBankName() {
    return this.runtimeWrapper?.getExposedAttribute("cfBankName");
  }
  set cfBankName(val) {
    this.runtimeWrapper?.updateExposedAttributes("cfBankName", val);
  };
    
    
    get runtimeWrapper() {
      return this.template.querySelector('omnistudio-flex-card-standard-runtime-wrapper');
    }
}