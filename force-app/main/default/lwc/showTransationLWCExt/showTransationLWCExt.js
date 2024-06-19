import { LightningElement, track, api } from 'lwc';
import { OmniscriptBaseMixin } from "omnistudio/omniscriptBaseMixin";

export default class ShowTransationLWCExt extends OmniscriptBaseMixin(LightningElement){
		@track _records =[];
		
		@api 
		get records(){
				return this._records;
		}
		set records(value){
				if(value){
						this._records = value;
				}
		}
		
		@api
			set omniCustomState(data) {
				if (data) {
					this._omniCustomState = data;
				}
			}

			get omniCustomState() {
				return this._omniCustomState;
			}
}