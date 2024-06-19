import { LightningElement, api , track} from "lwc";
import { OmniscriptBaseMixin } from "omnistudio/omniscriptBaseMixin";
import pubsub from "omnistudio/pubsub";
import { loadScript } from "c/resourceLoader";
import GliderJS from "@salesforce/resourceUrl/DAOGlider";
import { loadStyle } from "lightning/platformResourceLoader";

// TODO - combine this component and daoProducts
export default class DaoProductCarouselLight extends OmniscriptBaseMixin(
  LightningElement
) {
  static renderMode = "light"; // the default is 'shadow'
  @track _omniJsonData;
  _products;
  /** @type {string[]} */
  _initialSelected;
  /** @type {boolean} */
  isLoaded;
  /** @type {boolean} */
  showValidation;
  /** @type {boolean} */
  hasReported;
  _gliderName = "glider";
  pubsubPayload = {
    deselectProduct: this.handleDeselectProduct.bind(this),
    updateQuantity: this.handleUpdateQuantity.bind(this)
  };
  @api get initialSelected() {
    return this._initialSelected;
  }
  set initialSelected(value) {
    this._initialSelected = value?.split(";");
  }

  @api get products() {
    this.omniJsonData.DAOSelectedProducts?.forEach(currentItem => {
      this._products.forEach(currentItem1 => {
        if (currentItem.productId == currentItem1.Id) {
          currentItem1['isSelected'] = true;
        }
      });
    });
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

  @api get gliderName() {
    pubsub.fire("daoSelectedProducts", "updateTableButton", { detail: { action: false } });
    console.log('getting gliderName', this._gliderName);
    return this._gliderName;
  }
  set gliderName(value) {
    this._gliderName = value ?? "glider";
  }

  // Require at least one product selected
  @api checkValidity() {
    console.log('Methdo called validy');
    console.log('Console 18');
    // eslint-disable-next-line @lwc/lwc/prefer-custom-event
    window.dispatchEvent(new Event("resize"));

    console.log('Cheked the data it is called' + JSON.stringify(this.omniJsonData));
    const isValid = this.omniJsonData?.DAOSelectedProducts?.length > 0;
    this.showValidation = !isValid && this.hasReported;
    return isValid;
    return true;
  }

  @api reportValidity() {
    this.hasReported = true;
      console.log('Console 19');
    return this.checkValidity();
  }

  connectedCallback() {
    pubsub.register("daoSelectedProducts", this.pubsubPayload);
    this.setInitialSelected();
    this.loadGliderResources();
			console.log('omnijsonData connected', JSON.stringify(this.omniJsonData.DAOSelectedProducts));
  }

  renderedCallback() {
		console.log('omnijsonData rendered', JSON.stringify(this.omniJsonData.DAOSelectedProducts));
    console.log(this.gliderName + " has been rendered.");
  }

  disconnectedCallback() {
    console.log(this.gliderName + " has been destroyed.");
    window.Glider(this.querySelector("." + this.gliderName)).destroy();

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
    console.log("quantity" , evt.detail.quantity);
    const { productCode, productName, productId, isSelected,quantity } = evt.detail;

    if (isSelected) {
      console.log("Check me if am called Mohit -> Selected");
      this.notifySelected({ productCode, productName, productId });
    } else {
      console.log("Check me if am called Mohit -> De Selected");
      this.notifyDeselected({ productCode, productName, productId });
    }

    console.log("Check me if am called Mohit --> Without");
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
    this.updateSelectedProducts({ productCode, productName, productId }, false);
  }

  /**
   * @param {Object} product
   * @param {string} product.productCode
   * @param {string} product.productName
   * @param {string} product.productId
   */
  handleUpdateQuantity({ productCode, productName, productId, quantity }) {
    this.updateProductQuantity({
      productCode,
      productName,
      productId,
      quantity
    });
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
      productId,
      quantity: 1 // default quantity to 1
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
   * Update product quantity
   * @param {Object} product
   * @param {string} product.productCode
   * @param {string} product.productName
   * @param {string} product.productId
   * @param {number} product.quantity
   */
  async updateProductQuantity({
    productCode,
    productName,
    productId,
    quantity
  }) {
    console.log('updateProductQuantity 111',this.omniJsonData.DAOSelectedProductsLWC);
    console.log('updateProductQuantity 222 ',JSON.stringify(this.omniJsonData.DAOSelectedProductsLWC));
    const oldSelectedProducts = this.omniJsonData.DAOSelectedProductsLWC ?? [];
    let newSelectedProducts = [...oldSelectedProducts];

    const existingProductIdx = newSelectedProducts.findIndex(
      (selectedProduct) => selectedProduct.productId === productId
    );

    newSelectedProducts.splice(existingProductIdx, 1, {
      productCode,
      productName,
      productId,
      quantity
    });
    console.log('newSelectedProducts 111'+ newSelectedProducts);
    console.log('newSelectedProducts 222'+ JSON.stringify(newSelectedProducts));
    this.updateOmniscriptJson(newSelectedProducts);

    await Promise.resolve();
    this.omniValidate();
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

    console.log("Method Called --> updateSelectedProducts ");
    console.log('updateProductQuantity2 ',this.omniJsonData.DAOSelectedProductsLWC);
    console.log('updateProductQuantity2 ',JSON.stringify(this.omniJsonData.DAOSelectedProductsLWC));
    const oldSelectedProducts = this.omniJsonData.DAOSelectedProductsLWC ?? [];
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

      console.log('Reched at is Selected buddy '  + productName);

      newSelectedProducts = [
        ...oldSelectedProducts,
        { productCode, productName, productId }
      ];
    } else {
      newSelectedProducts = oldSelectedProducts.filter(
        (selectedProduct) => selectedProduct.productId !== productId
      );
    }




   this.updateOmniscriptJson(newSelectedProducts);

    await Promise.resolve();
    this.omniValidate();
  }

  /**
   * Load carousel library
   */
  async loadGliderResources() {
    try {
      await Promise.all([
        loadScript(this, GliderJS + "/glider.min.js"),
        loadStyle(this, GliderJS + "/glider.min.css")
      ]);

      this.isLoaded = true;

      await Promise.resolve();

      // eslint-disable-next-line no-new
      new window.Glider(this.querySelector("." + this.gliderName), {
        slidesToShow: 1,
        slidesToScroll: 1,
        draggable: true,
        dots: this.refs.dots,
        arrows: {
          prev: this.refs.prevButton,
          next: this.refs.nextButton
        },
        responsive: [
          {
            breakpoint: 760,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              duration: 0.5
            }
          },
          {
            breakpoint: 1400,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              duration: 0.5
            }
          }
        ]
      });
    } catch (error) {
      console.log("Error loading GliderJS", error.message);
    }
  }

  /**
   * Update OS JSON with nodes:
   *  DAOSelectedProductsLWC - List of products selected used by LWC
   *  DAOSelectedProductsStr - String of selected product ids separated by semicolons
   *  DAOSelectedProducts - Full list of products selected, duplicated for each product quantity
   */
  updateOmniscriptJson(products) {
    console.log('products ** 111', products);
    console.log('products ** 11', JSON.stringify(products));

    console.log('Console 72');
    
    // Initialize the JSON structure
    this.omniApplyCallResp({
        DAOSelectedProductsLWC: [],
        DAOSelectedProducts: [],
        DAOSelectedProductsStr: null
    });

    // Array to store product IDs to be excluded
    const excludedProductIds = [];

    // Filter out products with 'remove' in the product name and collect their IDs
    const filteredProducts = products.filter((product) => {
        if (!product.productName || product.productName.toLowerCase().includes('remove')) {
            excludedProductIds.push(product.productId); // Store ID to exclude from DAOSelectedProductsLWC
            return false; // Skip this product
        }
        return true; // Include this product
    });

    // Initialize an empty array to hold the updated products list
    const updatedDAOSelectedProducts = [];

    // Iterate through each product in the filteredProducts array
    filteredProducts.forEach((product) => {
        // Determine the quantity to add (default to 1 if 'quantity' is not present)
        const quantityToAdd = product.quantity || 1;

        // Add the product to updatedDAOSelectedProducts multiple times based on quantityToAdd
        for (let i = 0; i < quantityToAdd; i++) {
            updatedDAOSelectedProducts.push({
                productCode: product.productCode,
                productName: product.productName,
                productId: product.productId,
                quantity: 1  // Each entry will have quantity 1
            });
        }
    });

    // Create an array of product IDs for DAOSelectedProductsStr
    const updatedDAOSelectedProductsStr = updatedDAOSelectedProducts.map((product) => product.productId);

    // Join product IDs with semicolon for DAOSelectedProductsStr
    const finalDAOSelectedProductsStr = updatedDAOSelectedProductsStr.join(";");

    // Apply the updated JSON structure to the Omniscript response
    this.omniApplyCallResp({
        DAOSelectedProductsLWC: filteredProducts, // Use filteredProducts to exclude removed products
        DAOSelectedProducts: updatedDAOSelectedProducts,
        DAOSelectedProductsStr: finalDAOSelectedProductsStr
    });

    console.log('Updated DAOSelectedProducts ** ', JSON.stringify(updatedDAOSelectedProducts));
    console.log('Updated DAOSelectedProductsStr ** ', finalDAOSelectedProductsStr);

    // Handle excluded product IDs if needed
    console.log('Excluded Product IDs:', excludedProductIds);
}
}