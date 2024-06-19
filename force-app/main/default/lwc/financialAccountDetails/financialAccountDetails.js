import { LightningElement, api, track } from 'lwc';
export default class FinancialAccountDetails extends LightningElement {

		@api 
		get financialAccounts(){
				return this.financialAccontIds;
		}
		set financialAccounts(value){
				var arrayList = value instanceof Array;
				console.log('arrayList ', arrayList);
				if(!arrayList){
						if(value !== null){
								this.financialAccountsIds = [];
								this.financialAccountsIds.push(value);	
						}
				}else{
						this.financialAccountsIds = [];
						this.financialAccountsIds = value;
				}
				console.log('financialAccountIds', this.financialAccountsIds);
		}
		
		@track financialAccountsIds = [];
		
}