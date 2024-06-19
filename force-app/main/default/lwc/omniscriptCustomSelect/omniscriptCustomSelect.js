import { LightningElement, api, track} from 'lwc';

export default class OmniscriptCustomSelect extends LightningElement {
	
		@track recordtypeOptions=[
				{label:'Claims', value:'012780000008fkVAAQ'},
				{label:'Deposit Account and System Maintenance', value:'012780000008fkWAAQ'},
				{label:'Loan Services', value:'012780000008fkXAAQ'},
				{label:'Payments and Transaction Requests', value:'012780000008fkYAAQ'},
				{label:'Treasury Management Services & Maintenance', value:'012780000008fkZAAQ'},
				{label:'Voice of The Client', value:'012780000008fkaAAA'},
				{label:'Legal Requests', value:'012780000008gL7AAI'},
		]
		
		@api set omniData(value){
				console.log('set omni-data' , value);
				if(value){
						this.recordTypeId = (value != null || value != undefined || value != '') ? value : ''; //.SelectedRecordType: '';
				}
		}
		get omniData(){
				return this.recordTypeId;
		}
		
		@track recordTypeId;
		@track type;
		@track subType;
		
		handleRecordTypeChange(event){
				this.recordTypeId = event.detail.value;
		}
		
	handleTypeChange(event){
			this.type = event.detail.value;
	}
	handleSubTypeChange(event){
				this.subType = event.detail.value;
	}

	onLoad(event){
			console.log(JSON.parse(JSON.stringify(event.detail)));
	}
		
		
}