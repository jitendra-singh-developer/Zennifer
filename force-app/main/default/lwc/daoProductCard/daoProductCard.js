import { LightningElement, api, track } from "lwc";

export default class DaoProductCard extends LightningElement {
  @api product;
  @track isSelected;
  @track quantity;

  connectedCallback() {
    this.isSelected = this.product.isSelected || false;
    this.quantity = this.product.Quantity || 0;

    // Register the custom event listener
    window.addEventListener("productToggle", this.handleProductToggle.bind(this));
    window.addEventListener("productremoved", this.handleProductRemoval.bind(this));
  }

  disconnectedCallback() {
    // Unregister the custom event listener
    window.removeEventListener("productToggle", this.handleProductToggle.bind(this));
    window.addEventListener("productremoved", this.handleProductRemoval.bind(this));
  }

  handleToggle() {
    console.log('Console 71');
    this.isSelected = !this.isSelected;

    if (this.isSelected) {
      this.quantity += 1;
    } else {
      this.quantity = 0;
    }

    // Dispatch the custom event to inform other instances
    const toggleEvent = new CustomEvent("productToggle", {
      detail: {
        productId: this.product.Id,
        isSelected: this.isSelected,
        quantity: this.quantity
      }
    });
    window.dispatchEvent(toggleEvent);

    this.dispatchEvent(
      new CustomEvent("toggle", {
        detail: {
          productName: this.product.ProductName,
          productCode: this.product.ProductCode,
          productId: this.product.Id,
          isSelected: this.isSelected,
          quantity: this.quantity
        }
      })
    );
  }

  handleProductToggle(event) {
    // Check if the event is for the same product
    if (event.detail.productId === this.product.Id) {
      this.isSelected = event.detail.isSelected;
      this.quantity = event.detail.quantity;
    }
  }

  handleProductRemoval(event){
    console.log('Removal called' + event.detail.productId);
    if (event.detail.productId === this.product.Id) {
      this.isSelected = false;
      this.quantity = false;
    }
  }

  get cardClass() {
    return this.isSelected
      ? "dao-product-card-selected dao-product-card"
      : "dao-product-card";
  }

  get buttonVariant() {
    return this.isSelected ? "brand" : "neutral";
  }

  get buttonLabel() {
    return this.isSelected && this.quantity > 0 ? "SELECTED" : "SELECT PLAN";
  }

  get buttonIcon() {
    return this.isSelected ? "utility:check" : null;
  }
}