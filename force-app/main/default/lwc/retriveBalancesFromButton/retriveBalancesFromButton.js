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

    @api invoke() {
        this.executeCalloutRecordUpdate();
        }

	executeCalloutRecordUpdate() {
        this.isLoading = true;
        getRecordName({recordId: this.recordId})
        .then(result => {
            this.name = result
         })
         .catch(error => {
         });

        calloutRecordUpdate({recordId: this.recordId})
        .then(result => {
            this.isLoading = false;
            console.log('result'+result.isSuccess);
            if (result.isSuccess) {
                this.displayToast(this.name, 'Balances retrieve complete', 'Success','Dismissable');
            } else {
                this.displayToast(this.name,result.error,'error','sticky');
            }
         })
         .catch(error => {
         });
		
	}

	displayToast(title, message, variant, mode) {
		this.dispatchEvent(new ShowToastEvent({
			title: title,
			message: message,
			variant: variant,
			mode: mode
		}));
	}

}