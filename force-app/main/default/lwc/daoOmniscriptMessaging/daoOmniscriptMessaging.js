import OmniscriptMessaging from "omnistudio/omniscriptMessaging";
import tmpl from "./daoOmniscriptMessaging.html";
import tmpl_nds from "./daoOmniscriptMessaging_nds.html";
import tmpl_toast from "./daoOmniscriptMessaging_toast.html";
import { api } from "lwc";

/**
 * Enhances Omniscript Messaging component with new features:
 * 1. Only show inline messages after user clicks "Next"
 *        In OS JSON Properties add:
 *        {
 *            ...
 *            "showOnNext": true
 *        }
 */
export default class DaoOmniscriptMessaging extends OmniscriptMessaging {
  showValidation = false;
  hasClickedNext = false;
  @api messageText;

  render() {
    if (this.isToast) {
      return tmpl_toast;
    }
    return this.layout === "newport" ? tmpl_nds : tmpl;
  }

  connectedCallback() {
    super.connectedCallback();

    if (!this._propSetMap.showOnNext) {
      this.showValidation = true;
    }
  }

  @api reportValidity() {
    super.reportValidity();
    this.hasClickedNext = true;

    if ("Warning" === this.messageType) {
      if (this.isInline) {
        this.showValidation = this.showMessage;
      }
    }
  }

  get isInline() {
    return (
      "inline" === this._propSetMap.showMessageAs ||
      !this._propSetMap.showMessageAs
    );
  }

  get showMessage() {
    return (
      this.messageText &&
      ((this.hasClickedNext && this._propSetMap.showOnNext) ||
        !this._propSetMap.showOnNext)
    );
  }

  focus() {
    if ("Requirement" === this.messageType)
      if (this.isToast) this.showToast();
      else if (this.isInline) {
        this.showValidation = this.showMessage;
      } else {
        let focusTarget = this.wrapperEle;
        if (!focusTarget) return;
        focusTarget.setAttribute("tabindex", -1);
        focusTarget.focus();
        focusTarget.addEventListener("blur", this.removeTabIndex, {
          once: true
        });
      }
  }
}