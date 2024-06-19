import { LightningElement, api, track } from 'lwc';

export default class ClientInformation extends LightningElement {
    @api recordId;
    @track nacisCodeId;
		showSpinner=false;
		
		loadForm(event){
				console.log('load event from', JSON.parse(JSON.stringify(event.detail)));
				console.log('recordId', this.recordId);
						var record = event.detail.records;
						var type = typeof record;
						var fields = record[this.recordId].fields;
						if(fields.hasOwnProperty('NAICS__c')){
								this.nacisCodeId = fields.NAICS__c.value;	
						}
		}
}