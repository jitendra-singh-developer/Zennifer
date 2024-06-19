import { FlexCardMixin } from "omnistudio/flexCardMixin";
    import { CurrentPageReference } from 'lightning/navigation';
    import {interpolateWithRegex, interpolateKeyValue, loadCssFromStaticResource } from "omnistudio/flexCardUtility";
    
          import { LightningElement, api, track, wire } from "lwc";
          import pubsub from "omnistudio/pubsub";
          import { getRecord } from "lightning/uiRecordApi";
          
          import data from "./definition";
          
          import styleDef from "./styleDefinition";
              
          export default class cfSectionHeader_1_Gerent extends FlexCardMixin(LightningElement){
              currentPageReference;        
              @wire(CurrentPageReference)
              setCurrentPageReference(currentPageReference) {
                this.currentPageReference = currentPageReference;
              }
              @api debug;
              @api recordId;
              @api objectApiName;
              
              @track record;
              @track _sessionApiVars = {};
        @api set cfIcon(val) {
          if(typeof val !== "undefined") {
            this._sessionApiVars["Icon"] = val;
          }
        } get cfIcon() {
          return this._sessionApiVars["Icon"] || "custom:custom18";
        }
      
        @api set cfIconClass(val) {
          if(typeof val !== "undefined") {
            this._sessionApiVars["IconClass"] = val;
          }
        } get cfIconClass() {
          return this._sessionApiVars["IconClass"] || "slds-icon_container slds-icon-custom-custom18";
        }
      
        @api set cfHeading(val) {
          if(typeof val !== "undefined") {
            this._sessionApiVars["Heading"] = val;
          }
        } get cfHeading() {
          return this._sessionApiVars["Heading"] || "Heading Text";
        }
      
              
              pubsubEvent = [];
              customEvent = [];
              
              connectedCallback() {
                super.connectedCallback();
                this.setThemeClass(data);
                this.setStyleDefinition(styleDef);
                data.Session = {} //reinitialize on reload
                
                
                
                this.setDefinition(data);
 this.registerEvents();
                
                
              }
              
              disconnectedCallback(){
                super.disconnectedCallback();
                    
                    

                  this.unregisterEvents();
              }

              registerEvents() {
                
              }

              unregisterEvents(){
                
              }
            
              renderedCallback() {
                super.renderedCallback();
                
              }
          }