import { LightningElement, api } from "lwc";
import OmniscriptBlock from "omnistudio/omniscriptBlock";
import pubsub from "omnistudio/pubsub"; // Ensure this import is correct
import tmpl from "./daoOmniscriptBlock.html";
import tmpl_nds from "./daoOmniscriptBlock_nds.html";

export default class DaoOmniscriptBlock extends OmniscriptBlock {
  /** @type {boolean} */
  hideToggle = true;
  /** @type {boolean} */
  hideAdd = true;
  /** @type {boolean} */
  hideRemove = true;

  render() {
    return this.layout === "newport" ? tmpl_nds : tmpl;
  }

  initCompVariables() {
    super.initCompVariables();

    if (this._propSetMap.hideToggle) {
      this.hideToggle = this._propSetMap.hideToggle;
    }

    if (this._propSetMap.hideAdd) {
      this.hideAdd = this._propSetMap.hideAdd;
    }

    if (this._propSetMap.hideRemove) {
      this.hideRemove = this._propSetMap.hideRemove;
    }
  }

  connectedCallback() {
    super.connectedCallback();
    this.firePubsubEvent();
  }

  firePubsubEvent() {
    pubsub.fire("daoSelectedProducts", "updateTableButton", { detail: { action: true } });
  }

  get canToggleContent() {
    return !this.hideToggle;
  }

  get canAdd() {
    return super.canRepeat && !this.hideAdd;
  }

  // Uncomment if needed
  // get canRemove() {
  //   return super.canRemove && !this.hideRemove;
  // }

  get showButtonSet() {
    return this._propSetMap.repeat && (this.canRepeat || this.canRemove);
  }

  get blockLabel() {
    this.firePubsubEvent(); // Fire pubsub event when blockLabel is accessed
    const originalBlockLabel = super.blockLabel;
    if (originalBlockLabel.indexOf("%") > -1) {
      console.log('jsonDef : ',this.jsonDef);
      return this.getMergeFields(originalBlockLabel, this.jsonDef);
    }
    return originalBlockLabel;
  }

  get blockNumber() {
    return this.jsonDef.index + 1;
  }

  getMergeFields(fieldName, jsonDef) {
    if (!jsonDef || !jsonDef.response) {
      return "";
    }

    const regex = /%(.*?)%/g;
    const mergeFields = fieldName.match(regex);

    if (mergeFields && mergeFields.length > 0) {
      for (let n = 0; n < mergeFields.length; n += 1) {
        const fullMergeField = mergeFields[n];

        let mergeFieldVariable = fullMergeField;
        if (mergeFieldVariable.indexOf("|") > -1) {
          mergeFieldVariable = mergeFieldVariable.substring(
            0,
            mergeFieldVariable.indexOf("|")
          );
        }
        mergeFieldVariable = mergeFieldVariable.replace("%", "");

        const value = jsonDef.response[mergeFieldVariable] ?? ""; // avoid showing 'null' or 'undefined'

        fieldName = fieldName.replace(fullMergeField, value);
      }
    }

    fieldName = fieldName.replace("%", "");

    // trim off index number from the end of the label, if it's present
    const lastElement = fieldName.substring(fieldName.lastIndexOf(" "));
    if (lastElement) {
      // eslint-disable-next-line eqeqeq
      if (lastElement == jsonDef.index + 1) {
        fieldName = fieldName.substring(0, fieldName.lastIndexOf(" "));
      }
    }
console.log('fieldName : ',fieldName);
    return fieldName;
  }
}