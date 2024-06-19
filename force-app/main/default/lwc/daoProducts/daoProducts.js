import { LightningElement, api } from "lwc";
import { OmniscriptBaseMixin } from "omnistudio/omniscriptBaseMixin";
import pubsub from "omnistudio/pubsub";

export default class DaoRecommendedProducts extends OmniscriptBaseMixin(
  LightningElement
) {
  _omniJsonData;
  _products;
  showValidation;
  hasReported;
  pubsubPayload = {
    deselectProduct: this.handleDeselectProduct.bind(this)
  };

  @api get products() {
    return this._products;
  }
  set products(value) {
    if (value) {
      this._products = Array.isArray(value)
        ? value.map((val, idx) => {
            return {
              isMostPopular: idx === 1,
              ...val
            };
          })
        : [
            {
              isMostPopular: true,
              ...value
            }
          ];
    } else {
      this._products = null;
    }
  }

  // Require at least one product selected
  @api checkValidity() {
    const isValid = this.omniJsonData?.DAOSelectedProducts?.length > 0;
    this.showValidation = !isValid && this.hasReported;

    return isValid;
  }

  @api reportValidity() {
    this.hasReported = true;
    return this.checkValidity();
  }

  connectedCallback() {
    pubsub.register("daoSelectedProducts", this.pubsubPayload);
  }

  /**
   * Let other components know when a product has been toggled
   * @param {Object} evt
   */
  handleToggle(evt) {
    const { productCode, productName, productId, isSelected } = evt.detail;

    if (isSelected) {
      this.notifySelected({ productCode, productName, productId });
    } else {
      this.notifyDeselected({ productCode, productName, productId });
    }

    this.updateSelectedProducts(
      { productCode, productName, productId },
      isSelected
    );
  }

  /**
   * @param {Object} product
   * @param {string} product.productCode
   * @param {string} product.productName
   * @param {string} product.productId
   */
  notifySelected({ productCode, productName, productId }) {
    pubsub.fire("daoSelectedProducts", "selectProduct", {
      productCode,
      productName,
      productId
    });
  }

  /**
   * @param {Object} product
   * @param {string} product.productCode
   * @param {string} product.productName
   * @param {string} product.productId
   */
  notifyDeselected({ productCode, productName, productId }) {
    pubsub.fire("daoSelectedProducts", "deselectProduct", {
      productCode,
      productName,
      productId
    });
  }

  /**
   * When a product is toggled:
   * 1. Update isSelected on this.products
   * 2. Update OS JSON
   * 3. Trigger component validation
   * @param {Object} product
   * @param {string} product.productCode
   * @param {string} product.productName
   * @param {string} product.productId
   * @param {boolean} isSelected
   */
  async updateSelectedProducts(
    { productCode, productName, productId },
    isSelected
  ) {
    const oldSelectedProducts = this.omniJsonData.DAOSelectedProducts ?? [];
    let newSelectedProducts;

    this._products = this._products.map((product) => {
      if (product.Id === productId) {
        return {
          ...product,
          isSelected
        };
      }

      return product;
    });

    if (isSelected) {
      newSelectedProducts = [
        ...oldSelectedProducts,
        { productCode, productName, productId }
      ];
    } else {
      newSelectedProducts = oldSelectedProducts.filter(
        (selectedProduct) => selectedProduct.productId !== productId
      );
    }

    this.omniApplyCallResp({
      DAOSelectedProducts: newSelectedProducts,
      DAOSelectedProductsStr: newSelectedProducts
        ?.map((product) => product.productId)
        .join(";")
    });

    await Promise.resolve();
    this.omniValidate();
  }

  /**
   * @param {Object} product
   * @param {string} product.productCode
   * @param {string} product.productName
   * @param {string} product.productId
   */
  handleDeselectProduct({ productCode, productName, productId }) {
    this.updateSelectedProducts({ productCode, productName, productId }, false);
  }

  disconnectedCallback() {
    pubsub.unregister("daoSelectedProducts", this.pubsubPayload);
  }
}