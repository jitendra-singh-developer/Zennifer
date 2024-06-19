import { api, track, LightningElement } from 'lwc';
import { OmniscriptBaseMixin } from "omnistudio/omniscriptBaseMixin";
import pubsub from "omnistudio/pubsub";

export default class DaoProductsCustomSlider extends OmniscriptBaseMixin(LightningElement) {
  autoScroll = false;
  customHeight = 'auto';
  customWidth = 'auto';
  hideNavigationButtons = false;
  hideNavigationDots = false;
  hideSlideNumber = false;
  hideSlideText = false;
  scrollDuration = 5000;
  slideIndex = 1;
  timer;

  get maxWidth() {
    return `width: ${this.customWidth}`;
  }

  get maxHeight() {
    return `height: ${this.customHeight}`;
  }


  _omniJsonData;
  @track  _products= [];
  _initialSelected;
  isLoaded;
  showValidation;
  hasReported;
  showProducts = true;

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
      var selected = false;
      this._products = value.map((slide, i) => {
        if(i === 0){
          return {
            ...slide,
            index: i +1,
            isSelected: selected,
            buttonVariant: ((selected == false)? "neutral" :"brand"),
            buttonLabel: ((selected == false)? "SELECT PLAN" :"SELECTED"),
            buttonIcon: ((selected == false)? null :"utility:check"),
            slideClass: 'fade slds-show',
            dotClass: 'dot active'
          };
        }
        return {
          ...slide,
            index: i +1,
            isSelected: selected,
            buttonVariant: ((selected == false)? "neutral" :"brand"),
            buttonLabel: ((selected == false)? "SELECT PLAN" :"SELECTED"),
            buttonIcon: ((selected == false)? null :"utility:check"),
            slideClass: 'fade slds-hide',
            dotClass: 'dot '
        }
      });
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
    if (this.autoScroll) {
      this.timer = window.setInterval(() => {
        this.handleSlideSelection(this.slideIndex + 1);
      }, Number(this.scrollDuration));
    }
  }

  disconnectedCallback() {
    if (this.autoScroll) {
      window.clearInterval(this.timer);
    }
    pubsub.unregister("daoSelectedProducts", this.pubsubPayload);
  }

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
      var productCode;
      var productName;
      var isSelected;
      var productId = evt.target.accessKey;
      this._products.forEach((prd)=>{
        if(prd.Id === productId){
          productCode = prd.ProductCode;
          productName = prd.ProductName;
          isSelected = !prd.isSelected;
          prd.buttonVariant = ((prd.isSelected == false)? "neutral" :"brand");
          prd.buttonLabel = ((prd.isSelected == false)? "SELECT PLAN" :"SELECTED");
          prd.buttonIcon = ((prd.isSelected == false)? null :"utility:check");
        }
      });
      //const { productCode, productName, productId, isSelected } = evt.detail;
  
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
            isSelected,
            buttonVariant: ((isSelected == false)? "neutral" :"brand"),
            buttonLabel: ((isSelected == false)? "SELECT PLAN" :"SELECTED"),
            buttonIcon: ((isSelected == false)? null :"utility:check")
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

  showSlide(event) {
    const slideIndex = Number(event.target.dataset.id);
    this.handleSlideSelection(slideIndex);
  }

  slideBackward() {
    const slideIndex = this.slideIndex - 1;
    this.handleSlideSelection(slideIndex);
  }

  slideForward() {
    const slideIndex = this.slideIndex + 1;
    this.handleSlideSelection(slideIndex);
  }

  handleSlideSelection(index) {
    this.showProducts = false;
    console.log('Index ',JSON.stringify(index));
    if (index > this._products.length) {
      this.slideIndex = 1;
    } else if (index < 1) {
      this.slideIndex = this._products.length;
    } else {
      this.slideIndex = index;
    }

    var newList = [];
    this._products.forEach((prd)=>{
      if(this.slideIndex === prd.index){
          prd.slideClass = 'fade slds-show';
          prd.dotClass = 'dot active';
      }else{
          prd.slideClass = 'fade slds-hide';
          prd.dotClass = 'dot';
      }
      newList.push(prd);
    });
    this._products = [];
    this._products = newList;
    this.showProducts = true;
    console.log('products 2 ',JSON.stringify(this._products));
  }
}