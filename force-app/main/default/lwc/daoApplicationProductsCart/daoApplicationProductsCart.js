import { LightningElement } from "lwc";
import { OmniscriptActionCommonUtil } from "omnistudio/omniscriptActionUtils";

export default class DaoApplicationProductsCart extends LightningElement {
  _actionUtilClass;
  selectedProducts = [];
  isLoading = true;
  contextId;

  get hasProducts() {
    return this.selectedProducts?.length > 0;
  }

  get count() {
    return this.selectedProducts?.length ?? 0;
  }

  get hasOne() {
    return this.count === 1;
  }

  get deselectButtonFill() {
    return this.hasOne ? "var(--theme-text-light)" : "var(--theme-primary)";
  }

  connectedCallback() {
    this._actionUtilClass = new OmniscriptActionCommonUtil();
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    this.contextId = urlParams.get("c__ContextId");

    this.getSelectedProducts();
  }

  getSelectedProducts() {
    const params = {
      input: {
        ContextId: this.contextId
      },
      sClassName: "omnistudio.IntegrationProcedureService",
      sMethodName: "DAO_GetCartProducts",
      options: {}
    };

    this._actionUtilClass
      .executeAction(params, null, this, null, null)
      .then(({ result: { IPResult } }) => {
        this.selectedProducts = IPResult?.products;
        this.isLoading = false;
      })
      .catch((error) => {
        console.log("error", error);
      });
  }

  async handleDeselectProduct(evt) {
    const id = evt.detail;

    await this.deleteApplicationProducts(id);

    this.getSelectedProducts();
  }

  deselectProduct(evt) {
    const productName = evt.target.dataset.name;
    const id = evt.target.dataset.id;

    this.template.querySelector("c-dao-confirm-modal").open({
      reference: id,
      content: `Are you sure you want to remove<br/><strong>${productName}</strong><br/>from this application?`
    });
  }

  /**
   * @param {string} id
   */
  deleteApplicationProducts(id) {
    this.isLoading = true;

    const params = {
      input: {
        Id: id
      },
      sClassName: "omnistudio.IntegrationProcedureService",
      sMethodName: "DAO_DeleteApplicationProduct",
      options: {}
    };

    return this._actionUtilClass
      .executeAction(params, null, this, null, null)
      .then(() => {})
      .catch((error) => {
        console.log("deleteApplicationProducts error", error);
        this.isLoading = false;
      });
  }
}