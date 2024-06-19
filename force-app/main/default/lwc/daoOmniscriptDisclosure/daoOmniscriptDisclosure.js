import { api } from "lwc";
import OmniscriptDisclosure from "omnistudio/omniscriptDisclosure";
import tmpl from "./daoOmniscriptDisclosure.html";
import { loadCssFromStaticResource } from "omnistudio/utility";

export default class DaoOmniscriptDisclosure extends OmniscriptDisclosure {
  /** @type {string} - Static Resource name */
  resource;
  /** @type {boolean} */
  hasViewed;
  /** @type {boolean} */
  hasValidated;

  /** @type {string} */
  get buttonIconFill() {
    return this.hasViewed
      ? "var(--theme-primary)"
      : "var(--theme-primary-text)";
  }
  /** @type {string} */
  get buttonVariant() {
    return this.hasViewed ? "neutral" : "brand";
  }
  /** @type {string} */
  get buttonLabel() {
    return this.hasViewed ? "Viewed" : "View";
  }
  /** @type {string} */
  get buttonIcon() {
    return this.hasViewed ? "utility:check" : "utility:preview";
  }

  get showError() {
    return this.hasValidated && !this.hasViewed;
  }

  connectedCallback() {
    this.hasViewed = this.jsonDef.response; // allow prefill

    loadCssFromStaticResource(this, "DAOTermsConditionsCSS", "/style.css").then(
      () => {}
    );

    super.connectedCallback();
  }

  render() {
    return tmpl;
  }

  /**
   * Require document to be viewed in addition to checkbox checked
   * @override
   */
  @api checkValidity() {
    this.evaluateValidity();
    super.checkValidity();
  }

  /**
   * Require document to be viewed in addition to checkbox checked
   * @override
   */
  @api reportValidity() {
    this.hasValidated = true;
    this.evaluateValidity();
    super.reportValidity();
  }

  /**
   * Open modal
   */
  handleView() {
    this.template.querySelector("c-dao-terms-and-conditions-modal").open({
      name: this._propSetMap.label,
      body: this._propSetMap.text
    });
  }

  /**
   * Set custom error message if user has not viewed document
   */
  evaluateValidity() {
    const input = this.template.querySelector("omnistudio-input");
    if (!this.hasViewed) {
      input.setCustomValidity(
        "Error: You must view the above document before continuing."
      );
    }
  }

  /**
   * Update validity after document is read
   */
  handleRead() {
    this.hasViewed = true;

    // Check disclosure checkbox
    this.handleManualCheck();

    // Update OS JSON with datetime read
    this.applyCallResp(new Date());
  }

  /**
   * @override
   */
  applyCallResp(json, bApi = false, bValidation = false) {
    if (bValidation) {
      // set custom error considering json as error
      this.setCustomValidation(json);
    } else {
      // add second param bValidation back later
      // only if it changes, then aggregate
      json = this.treatResp(json);
      this.setElementValue(json, bApi, bValidation);
      this.dispatchOmniEventUtil(
        this,
        this.createAggregateNode(),
        "omniaggregate"
      );
    }
  }

  /**
   * Manually check box and reset validations
   */
  handleManualCheck() {
    const input = this.template.querySelector("omnistudio-input");
    input.resetValidations();
    this.setCustomValidation("");
  }
}