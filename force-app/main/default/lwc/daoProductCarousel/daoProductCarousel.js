import { LightningElement, api } from "lwc";
import { OmniscriptBaseMixin } from "omnistudio/omniscriptBaseMixin";
import pubsub from "omnistudio/pubsub";
import {
  loadCssFromStaticResource,
  loadJsFromStaticResource
} from "omnistudio/utility";

// TODO - combine this component and daoProducts
export default class DaoProductCarousel extends OmniscriptBaseMixin(
  LightningElement
) {
  _omniJsonData;
  _products;
  /** @type {string[]} */
  _initialSelected;
  /** @type {boolean} */
  isLoaded;
  /** @type {boolean} */
  showValidation;
  /** @type {boolean} */
  hasReported;
  elPath = ".glider";
  pubsubPayload = {
    deselectProduct: this.handleDeselectProduct.bind(this)
  };
  @api get initialSelected() {
    return this._initialSelected;
  }
  set initialSelected(value) {
    this._initialSelected = value?.split(";");
  }

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
    // eslint-disable-next-line @lwc/lwc/prefer-custom-event
    window.dispatchEvent(new Event("resize"));

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

    this.setInitialSelected();
    this.loadGliderResources();
  }

  disconnectedCallback() {
    window.Glider(this.template.querySelector(this.elPath)).destroy();

    pubsub.unregister("daoSelectedProducts", this.pubsubPayload);
  }

  /**
   * Notify other components if products have already been selected on product load
   */
  setInitialSelected() {
    if (!this.initialSelected) return;

    this.initialSelected.forEach((productId) => {
      const selectedProduct = this.products.find((product) => {
        return product.Id === productId;
      });

      if (selectedProduct) {
        this.notifySelected({
          productCode: selectedProduct.ProductCode,
          productName: selectedProduct.ProductName,
          productId
        });
        this.updateSelectedProducts(
          {
            productCode: selectedProduct.ProductCode,
            productName: selectedProduct.ProductName,
            productId
          },
          true
        );
      }
    });
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
  handleDeselectProduct({ productCode, productName, productId }) {
    console.log('Console 16');
    this.updateSelectedProducts({ productCode, productName, productId }, false);
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
   * Load carousel library
   */
  loadGliderResources() {
    loadCssFromStaticResource(this, "DAOGlider", "/glider.min.css").then(
      () => {}
    );

    loadJsFromStaticResource(this, "DAOGlider", "/glider.min.js").then(
      async () => {
        this.isLoaded = true;

        await Promise.resolve();

        // eslint-disable-next-line no-new
        new window.Glider(this.template.querySelector(this.elPath), {
          slidesToShow: 1,
          slidesToScroll: 1,
          draggable: true,
          dots: this.template.querySelector(".dots"),
          arrows: {
            prev: this.template.querySelector(".glider-prev"),
            next: this.template.querySelector(".glider-next")
          },
          responsive: [
            {
              breakpoint: 1200,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
                duration: 0.5
              }
            }
          ]
        });
      }
    );
  }
}