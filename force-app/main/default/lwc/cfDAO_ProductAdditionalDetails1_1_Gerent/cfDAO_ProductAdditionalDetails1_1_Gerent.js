import { FlexCardMixin } from "omnistudio/flexCardMixin";
    import { CurrentPageReference } from 'lightning/navigation';
    import {interpolateWithRegex, interpolateKeyValue, loadCssFromStaticResource } from "omnistudio/flexCardUtility";
    
          import { LightningElement, api, track, wire } from "lwc";
          import pubsub from "omnistudio/pubsub";
          import { getRecord } from "lightning/uiRecordApi";
          import { OmniscriptBaseMixin } from "omnistudio/omniscriptBaseMixin";
          import data from "./definition";
          
          import styleDef from "./styleDefinition";
              
          export default class cfDAO_ProductAdditionalDetails1_1_Gerent extends FlexCardMixin(OmniscriptBaseMixin(LightningElement)){
              currentPageReference;        
              @wire(CurrentPageReference)
              setCurrentPageReference(currentPageReference) {
                this.currentPageReference = currentPageReference;
              }
              @api debug;
              @api recordId;
              @api objectApiName;
              @track _omniSupportKey = 'cfDAO_ProductAdditionalDetails1_1_Gerent';
                  @api get omniSupportKey() {
                    return this._omniSupportKey;
                  }
                  set omniSupportKey(parentRecordKey) {
                    this._omniSupportKey = this._omniSupportKey  + '_' + parentRecordKey;
                  }
              @track record;
              
              
              pubsubEvent = [];
              customEvent = [];
              
              connectedCallback() {
                super.connectedCallback();
                this.setThemeClass(data);
                this.setStyleDefinition(styleDef);
                data.Session = {} //reinitialize on reload
                
                this.flexiPageWidthAwareCB = this.flexiPageWidthAware.bind(this);
                  window.addEventListener('resize', this.flexiPageWidthAwareCB);
                
                this.setDefinition(data);
 this.registerEvents();
                
                
              }
              
              disconnectedCallback(){
                super.disconnectedCallback();
                    this.omniSaveState(this.records,this.omniSupportKey,true);
                    window.removeEventListener('resize', this.flexiPageWidthAwareCB);

                  this.unregisterEvents();
              }

              registerEvents() {
                
            this.customEventName0 = interpolateWithRegex(`updateCheckOrders`,this._allMergeFields,this._regexPattern,"noparse");
            this.customEvent[0] = this.handleEventAction.bind(this, data.events[0],0);

            this.template.addEventListener(this.customEventName0,this.customEvent[0]);

          
            this.customEventName1 = interpolateWithRegex(`updateDebitCard`,this._allMergeFields,this._regexPattern,"noparse");
            this.customEvent[1] = this.handleEventAction.bind(this, data.events[1],1);

            this.template.addEventListener(this.customEventName1,this.customEvent[1]);

          
            this.customEventName2 = interpolateWithRegex(`updateDACA`,this._allMergeFields,this._regexPattern,"noparse");
            this.customEvent[2] = this.handleEventAction.bind(this, data.events[2],2);

            this.template.addEventListener(this.customEventName2,this.customEvent[2]);

          
            this.customEventName3 = interpolateWithRegex(`updateAccessLevel`,this._allMergeFields,this._regexPattern,"noparse");
            this.customEvent[3] = this.handleEventAction.bind(this, data.events[3],3);

            this.template.addEventListener(this.customEventName3,this.customEvent[3]);

          
            this.customEventName4 = interpolateWithRegex(`updateCreditorName`,this._allMergeFields,this._regexPattern,"noparse");
            this.customEvent[4] = this.handleEventAction.bind(this, data.events[4],4);

            this.template.addEventListener(this.customEventName4,this.customEvent[4]);

          
              }

              unregisterEvents(){
                
            this.template.removeEventListener(this.customEventName0,this.customEvent[0]);

            this.template.removeEventListener(this.customEventName1,this.customEvent[1]);

            this.template.removeEventListener(this.customEventName2,this.customEvent[2]);

            this.template.removeEventListener(this.customEventName3,this.customEvent[3]);

            this.template.removeEventListener(this.customEventName4,this.customEvent[4]);

              }
            
              renderedCallback() {
                super.renderedCallback();
                
                if(!this.containerWidthInitialised) {
                  this.containerWidthInitialised = true;
                  this.flexiPageWidthAware();
                }
              }
          }