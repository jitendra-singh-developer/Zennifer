import { LightningElement,api, track } from 'lwc';
export default class VerifyIdentity extends LightningElement {

		@track inputVariables = [];
		@api get recordId(){
				return this.inputVariables;
		}
		set recordId(value){
				console.log('Verify Identity recordID',value);
				if(value){
						let inputvarArray = [ {
																				name: 'recordId',
																				type: 'String',
																				value: value
																		}];
				this.inputVariables = inputvarArray;
				}
		}
}