import { LightningElement } from "lwc";

export default class DaoDocuSignStatus extends LightningElement {
  isComplete;
  isError;

  connectedCallback() {
    this.handleDocuSignStatus();
  }

  handleDocuSignStatus() {
    let searchStr = window.location.search;

    searchStr = searchStr?.substring(
      searchStr.indexOf("&event="),
      searchStr.length
    );
    searchStr = searchStr?.substring(
      searchStr.indexOf("=") + 1,
      searchStr.length
    );

    if (searchStr === "signing_complete") {
      this.isComplete = true;
    } else if (searchStr) {
      this.isError = true;
    } else {
      console.log("no searchStr");
    }

    window.parent.postMessage(searchStr, "*");
  }
}