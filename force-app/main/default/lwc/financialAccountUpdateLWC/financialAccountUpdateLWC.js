import { LightningElement, api, track,wire } from 'lwc';
import { getRecordNotifyChange } from 'lightning/uiRecordApi';
import calloutRecordUpdate from '@salesforce/apex/FinancialAccountUpdateLWCController.calloutRecordUpdate';
import getRecordName from '@salesforce/apex/FinancialAccountUpdateLWCController.getRecordName';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';



export default class FinancialAccountUpdateLWC extends LightningElement {
	@api recordId;
	@api recordTypeId;
	@api objectApiName;
	@api response;
	@api showUI = false;
	@api apiFieldNames;
	@api title;
	@track isLoading = true;
	name;

	_fields = [];
	_hasRendered = false;

	async renderedCallback() {
		if (!this._hasRendered) {
			this._hasRendered = true;

			if (!this.showUI) {
				this.executeCalloutRecordUpdate();
			} else {
				if (this.apiFieldNames) {
					this._fields = this.apiFieldNames.split(';');
				}
			}
		}
	}

	// =========================================================
	// AURA ENABLED FUNCTION CALLS
	// =========================================================

	async executeCalloutRecordUpdate() {
			this.name = await getRecordName({ recordId: this.recordId });
			console.log('name'+this.name);
			console.log('name'+getRecordName({ recordId: this.recordId }));
			const result = await calloutRecordUpdate({ recordId: this.recordId });
			getRecordNotifyChange([{ recordId: this.recordId }]);
			this.isLoading = false;
			if (result.isSuccess) {
				this.displayToast(this.name, 'Balances retrieve complete', 'Success','Dismissable');
			} else {
				this.displayToast(this.name,result.error,'error','sticky');
			}
		
	}

	async handleBalanceRefresh() {
		this.executeCalloutRecordUpdate();
	}

	displayToast(title, message, variant, mode) {
		this.dispatchEvent(new ShowToastEvent({
			title: title,
			message: message,
			variant: variant,
			mode: mode
		}));
	}


	get isLoading() {
		return this._isLoading;
	}

	get fields() {
		return this._fields;
	}
}