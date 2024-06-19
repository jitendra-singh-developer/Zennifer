import OmniscriptDocusignSignatureAction from "omnistudio/omniscriptDocusignSignatureAction";
import tmpl from "./daoOmniscriptDocusignSignatureAction.html";

export default class DaoOmniscriptDocusignSignatureAction extends OmniscriptDocusignSignatureAction {
  _envelopeIdArray = [];

  render() {
    return tmpl;
  }

  /**
   * @override
   * Add timestamp when Document is viewed to OS JSON
   */
  connectedCallback() {
    super.connectedCallback();
    window.addEventListener("message", async (event) => {
      const message = event?.data;
      let docuSignStatus;

      if (message === "signing_complete") {
        docuSignStatus = "Completed";
      } else {
        docuSignStatus = "Error";
      }

      if (this._envelopeIdArray[0]) {
        this._envelopeIdArray[0].status = docuSignStatus;
        this._envelopeIdArray[0].timestamp = new Date();

        try {
          this.dispatchOmniEventUtil(
            this,
            {
              apiResponse: {
                [this.jsonDef.name]: this._envelopeIdArray
              }
            },
            "omniactionbtn"
          );
        } catch (e) {
          console.log("error dispatchOmniEventUtil", e);
        }
      }
    });
  }
}