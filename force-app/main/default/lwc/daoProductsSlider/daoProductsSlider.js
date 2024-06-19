import { LightningElement, track, api } from 'lwc';
import { OmniscriptBaseMixin } from "omnistudio/omniscriptBaseMixin";
import pubsub from "omnistudio/pubsub";

export default class DaoProductsSlider extends OmniscriptBaseMixin(LightningElement){

    _omniJsonData;//OmniSrcipt data Json
    @track _products= []; //to store the products with the selected nodes
    _initialSelected; // Initial Selected Products
    
    showValidation; // Shows the error if product is not selected
    hasReported; //reports the validity
    showProducts = true;
  
    pubsubPayload = {
      deselectProduct: this.handleDeselectProduct.bind(this)
    };

  
    /*CAROUSEL DATA VARs*/ 
    @track newProductMap = []; // The array of the products that needs to be shown.
    maxWidth ='auto'; //Width of the carousel
    gridSize =''; //Sets the size of the Grid
    itemsToShow = 3; //Sets the number of items to be displayed on the carousel  
    maxSlideIndex; //The max number of slides in the carousel
    currentSlideIndex = 1; //Current slide number
    hideNavigationDots = false;

    //Method to get the initial Selected products 
    @api get initialSelected() {
      return this._initialSelected;
    }
    set initialSelected(value) {
      this._initialSelected = value?.split(";");
    }


    //Set the product array map from given products
    @api get products() {
      return this._products;
    }
    set products(value) {
 
      if (value) {
        this.maxSlideIndex = Math.ceil(value.length / this.itemsToShow);
        this.gridSize = (12 / this.itemsToShow);
        var productsArray = []; //Array to store the modified producted list.
        var startIndex = 0;

        //Add the selected node to the productList for selection;
        var selected = false;
        this._products = value.map((slide, i) => {
          if(i === 0){
            return {
              ...slide,
              isSelected: selected,
              buttonVariant: ((selected == false)? "neutral" :"brand"),
              buttonLabel: ((selected == false)? "SELECT PLAN" :"SELECTED"),
              buttonIcon: ((selected == false)? null :"utility:check")
            };
          }
          return {
            ...slide,
              isSelected: selected,
              buttonVariant: ((selected == false)? "neutral" :"brand"),
              buttonLabel: ((selected == false)? "SELECT PLAN" :"SELECTED"),
              buttonIcon: ((selected == false)? null :"utility:check")
          }
        });
       /* for(var i=0; i < this.maxSlideIndex; i++){
              var lastIndex = (i==0)?(this.itemsToShow):(startIndex+this.itemsToShow);
              var productArray = this._products.slice(startIndex, lastIndex);
              startIndex = lastIndex;
              let obj = {}; //Object to store the data for showing the products
              obj.index = i+1;
              obj.slideClass = (i==0)?'fade slds-show':'fade slds-hide';
              obj.dotClass=(i==0)?'dot active':'dot';
              obj.products = productArray;
              productsArray.push(obj);
            
        }
        this.newProductMap = productsArray; */
        this.setDisplayArray();
      
    }
  
    }

    setDisplayArray(){
      var productsArray = []; //Array to store the modified producted list.
      var startIndex = 0;
        for(var i=0; i < this.maxSlideIndex; i++){
          var lastIndex = (i==0)?(this.itemsToShow):(startIndex+this.itemsToShow);
          var productArray = this._products.slice(startIndex, lastIndex);
          startIndex = lastIndex;
          let obj = {}; //Object to store the data for showing the products
          obj.index = i+1;
          obj.slideClass = (i == (this.currentSlideIndex - 1))? 'fade slds-show':'fade slds-hide';
          obj.dotClass= (i == (this.currentSlideIndex - 1))?'dot active':'dot';
          obj.products = productArray;
          productsArray.push(obj);
        }
        this.newProductMap = productsArray;
    }

    // Require at least one product selected
    @api checkValidity() {
      // eslint-disable-next-line @lwc/lwc/prefer-custom-event
      window.dispatchEvent(new Event("resize"));

      const isValid = this.omniJsonData?.DAOSelectedProducts?.length > 0;
      this.showValidation = !isValid && this.hasReported;
      return isValid;
    }

    //Reports the Error
    @api reportValidity() {
      this.hasReported = true;

      return this.checkValidity();
    }

    //ConnectedCallback
    connectedCallback(){
      pubsub.register("daoSelectedProducts", this.pubsubPayload);
  
      this.setInitialSelected();
    }
  
    //DisconnectedCallback
    disconnectedCallback(){
      pubsub.unregister("daoSelectedProducts", this.pubsubPayload);
    }

    //Set initial Selected products function
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

    //Handle product Selection
    handleToggle(evt) {
      var productCode;
      var productName;
      var isSelected;
      var productId = evt.target.accessKey;
      console.log('productId ',productId);

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
     /* this.newProductMap.forEach((slide)=>{
        console.log('slide ',JSON.stringify(slide));
        if(slide.index === this.currentSlideIndex){
            slide.products.forEach((prd)=>{
            if(prd.Id === productId){
              console.log(JSON.stringify(prd));
              productCode = prd.ProductCode;
              productName = prd.ProductName;
              isSelected = !prd.isSelected;
              prd.buttonVariant = ((prd.isSelected == false)? "neutral" :"brand");
              prd.buttonLabel = ((prd.isSelected == false)? "SELECT PLAN" :"SELECTED");
              prd.buttonIcon = ((prd.isSelected == false)? null :"utility:check");
            }
          });
        }
      }); */
      //const { productCode, productName, productId, isSelected } = evt.detail;
  
      if (isSelected) {
        this.notifySelected({ productCode, productName, productId });
      } else {
        this.notifyDeselected({ productCode, productName, productId });
      }
  
      this.updateSelectedProducts({ productCode, productName, productId },isSelected);
    }

    //Handle product deselction
    handleDeselectProduct({ productCode, productName, productId }) {
      this.updateSelectedProducts({ productCode, productName, productId }, false);
    }

    //Notification for selection
    notifySelected({ productCode, productName, productId }) {
      pubsub.fire("daoSelectedProducts", "selectProduct", {
        productCode,
        productName,
        productId
      });
    }

    //Notification for Deselection
    notifyDeselected({ productCode, productName, productId }) {
      pubsub.fire("daoSelectedProducts", "deselectProduct", {
        productCode,
        productName,
        productId
      });
    }

    //Sync data with omniscript
    async updateSelectedProducts({ productCode, productName, productId },isSelected){
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
      this.setDisplayArray();
      /*
      this.newProductMap = this.newProductMap.forEach((slide)=>{
        console.log('slide ',JSON.stringify(slide));
        if(slide.index === this.currentSlideIndex){
            slide.products.forEach((prd)=>{
            if(prd.Id === productId){
              prd.isSelected = isSelected;
              prd.buttonVariant = ((isSelected == false)? "neutral" :"brand");
              prd.buttonLabel = ((isSelected == false)? "SELECT PLAN" :"SELECTED");
              prd.buttonIcon = ((isSelected == false)? null :"utility:check");
            }
          });
        }
      }); */

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
        DAOSelectedProductsStr: newSelectedProducts?.map((product) => product.productId).join(";")
      });
  
      await Promise.resolve();
      this.omniValidate();
    }

    /*CAROSULE Button handling*/

    handleSlideSelection(event) {
      const slideIndex = Number(event.target.dataset.id);
      this.showProductsInSlider(slideIndex);
    }

    handleNextButton(event){
        var newIndex = this.currentSlideIndex + 1;
        this.showProductsInSlider(newIndex);
    }

    handlePreviousButton(event){
        var newIndex = this.currentSlideIndex - 1;
        this.showProductsInSlider(newIndex);
    }

    showProductsInSlider(newIndex){
        if(newIndex > this.maxSlideIndex){
            this.currentSlideIndex = 1;
        }else if(newIndex < 1){
            this.currentSlideIndex = this.maxSlideIndex;
        }else{
            this.currentSlideIndex = newIndex;
        }

        this.newProductMap.forEach((prd)=>{
            if(prd.index === this.currentSlideIndex){
                prd.slideClass = 'fade slds-show';
                prd.dotClass = 'dot active';
            }else{
                prd.slideClass = 'fade slds-hide';
                prd.dotClass = 'dot';
            }
        });
    }

}