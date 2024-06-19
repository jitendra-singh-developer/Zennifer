import { LightningElement, api, track } from 'lwc';

export default class InvokeOmniscriptFromLWC extends LightningElement {
    @track _recordId;
    @track _objectApiName;
    @track showOmniscript = false;
		@api recordId;
		@api objectApiName;
		
  /*@api set recordId(value){
        this._recordId = value;
    }
    get recordId(){
        return this._recordId;
    }

    @api set objectApiName(value){
        this._objectApiName = value;
    }
    get objectApiName(){
        return this._objectApiName;
    } */

    @track prefill = {};    

		connectedCallback(){
					console.log('In connectedCallback');
        console.log('RecordID ',this.recordId);
        console.log('sobjectType ', this.objectApiName);
		}
    renderedCallback(){
        console.log('In renderedCallback');
        console.log('RecordID ',this.recordId);
        console.log('sobjectType ', this.objectApiName);
        if( ( Object.keys(this.prefill).length === 0 || Object.keys(this.prefill).length === 2 ) && this.showOmniscript === false){
            let prefill = {};
            prefill.ContextId = this.recordId;
            prefill.ObjectApiName = this.objectApiName;
            this.prefill = JSON.stringify(prefill);
            console.log('object',this.prefill);
						if(this.recordId !== undefined && this.objectApiName !== undefined){
									this.showOmniscript = true;
						}
        }
    }
}