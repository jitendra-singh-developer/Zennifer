import { FlexCardMixin } from "omnistudio/flexCardMixin";
    import { CurrentPageReference } from 'lightning/navigation';
    import {interpolateWithRegex, interpolateKeyValue, loadCssFromStaticResource } from "omnistudio/flexCardUtility";
    
          import { LightningElement, api, track, wire } from "lwc";
          import pubsub from "omnistudio/pubsub";
          import { getRecord } from "lightning/uiRecordApi";
          
          import data from "./definition";
          
          import styleDef from "./styleDefinition";
              
          export default class cfDAOApplicationStart_Internal_1_Gerent extends FlexCardMixin(LightningElement){
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
              
              pubsubEvent = [];
              customEvent = [];
               
        firstRender0 = true;
        @wire(getRecord , {recordId: "ApplicationId" , fields:"Application_FINS__c.Id",optionalFields: $cmp.getWireOptionalFields(data.events[0])})
          wiredRecord0({ error, data }){
            if (this.objectApiName === 'Application_FINS__c'){
              if(data && this.firstRender0){
                this.firstRender0 = false;
                return;
              }else{
                this.recordChangeEventHandler(error,data,0)
              }
            }
          }
        
              connectedCallback() {
                super.connectedCallback();
                this.setThemeClass(data);
                this.setStyleDefinition(styleDef);
                data.Session = {} //reinitialize on reload
                
                
                
                this.setDefinition(data);
 this.registerEvents();
                this.setAttribute(
                  "class", (this.getAttribute("class") ? this.getAttribute("class") : "") +
                  " card-0ko78000000GnPMAA0"
                );
                this.loadCustomStylesheetAttachement("00P7800000FIp0WEAT");
                
                
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