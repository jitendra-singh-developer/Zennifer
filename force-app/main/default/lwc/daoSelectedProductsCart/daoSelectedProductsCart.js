import { LightningElement, track, api } from "lwc";
import pubsub from "omnistudio/pubsub";
import { OmniscriptBaseMixin } from "omnistudio/omniscriptBaseMixin";

const MIN_QUANTITY = 1;
let MAX_QUANTITY  // Example maximum quantity, adjust as needed

export default class DaoSelectedProductsCart extends OmniscriptBaseMixin(LightningElement) {
  @track selectedProducts = [];

  @api disabled;

  

  pubsubPayload = {
    selectProduct: this.handleSelectProducts.bind(this),
    deselectProduct: this.handleDeselectProducts.bind(this),
    updateTableButton: this.handleTableButton.bind(this)
  };

  connectedCallback() {
    pubsub.register("daoSelectedProducts", this.pubsubPayload);
    this.initializeSelectedProducts();
  }

  initializeSelectedProducts() {
    // Initialize selectedProducts from omniJsonData if available
    console.log("Check please");
    if (this.omniJsonData && this.omniJsonData.DAOSelectedProductsLWC) {
      this.selectedProducts = this.omniJsonData.DAOSelectedProductsLWC.map(product => ({
        ...product,
        quantity: product.quantity || 1  // Default quantity to 1 if not provided
      }));
    }
  }

  get hasProducts() {
    return this.selectedProducts.length > 0;
  }

  get count() {
    return this.selectedProducts.reduce((total, product) => total + product.quantity, 0);
  }

  get stickyContainerClass() {
    return this.hasProducts ? "dao-sticky-container" : "dao-sticky-container dao-empty-cart";
  }

 

  handleSelectProducts({ productCode, productName, productId, quantity }) {
    console.log('Console log 19');
    const existingProduct = this.selectedProducts.find(product => product.productId === productId);

    if (existingProduct) {
      // Update quantity if product already exists
      existingProduct.quantity += quantity;
    } else {
      // Add new product to selectedProducts
      this.selectedProducts.push({
        productName,
        productCode,
        productId,
        quantity
      });
    }

    console.log('Updated selectedProducts:', this.selectedProducts);
  }

  handleDeselectProducts({ productId }) {
    console.log('Console log 20');
    // Find the product in selectedProducts array
    /*const existingProductIndex = this.selectedProducts.findIndex(product => product.productId === productId);
  
    if (existingProductIndex !== -1) {
      // Decrease quantity by 1 if greater than 1
      if (this.selectedProducts[existingProductIndex].quantity > 1) {
        this.selectedProducts[existingProductIndex].quantity--;
      } else {
        // Remove product if quantity is 1
        this.selectedProducts.splice(existingProductIndex, 1);
      }
    }
  
    console.log('Updated selectedProducts:', this.selectedProducts); */
    this.selectedProducts = this.selectedProducts.filter(product => product.productId !== productId);
  }
  
  removeProduct(productId) {
    console.log('Local Removal Called');
    //this.selectedProducts = this.selectedProducts.filter(product => product.productId !== productId);
    this.selectedProducts = this.selectedProducts.filter(product => product.productId !== productId);

    console.log('Updated selectedProducts:', this.selectedProducts);
    let removeString = 'remove';
    pubsub.fire("daoSelectedProducts", "updateQuantity", { removeString, removeString, productId});
    const event = new CustomEvent("productremoved", {
      detail: {
        productId: productId
      }
    });
    window.dispatchEvent(event);
    
  }


  deselectProduct(evt) {
    console.log('Deselectcalled');
    const { id } = evt.target.dataset;
    this.removeProduct(id);
  }

  decreaseQuantity(evt) {
    const productId = evt.target.dataset.id;
    console.log('JSON CHECK on DECREMENT' + JSON.stringify(evt.target.dataset));
    const newQuantity = +evt.target.dataset.quantity <= MIN_QUANTITY ? MIN_QUANTITY : +evt.target.dataset.quantity - 1;
    this.updateProductQuantity(evt.target.dataset.name,evt.target.dataset.code,productId, newQuantity);
  }

  increaseQuantity(evt) {
    const productId = evt.target.dataset.id;
    const newQuantity = +evt.target.dataset.quantity >= MAX_QUANTITY ? MAX_QUANTITY : +evt.target.dataset.quantity + 1;
    this.updateProductQuantity(evt.target.dataset.name,evt.target.dataset.code,productId, newQuantity);
  }

  updateProductQuantity(productName,productCode,productId, quantity) {
    const updatedProduct = this.selectedProducts.find(product => product.productId === productId);

    if (updatedProduct) {
      updatedProduct.quantity = quantity;
      console.log('Updated selectedProducts:', JSON.stringify(this.selectedProducts));
      console.log('Updated selectedProducts:', JSON.stringify(updatedProduct));
      pubsub.fire("daoSelectedProducts", "updateQuantity", { productName, productCode, productId, quantity });
    }
  }

  handleTableButton(event) {
    console.log('Disable Method called')
    this.disabled = event.detail.action;
  }


  disconnectedCallback() {
    pubsub.unregister("daoSelectedProducts", this.pubsubPayload);
  }
}