import { LightningElement, api, track } from 'lwc';
import { OmniscriptBaseMixin } from 'omnistudio/omniscriptBaseMixin';
export default class DynamicCaseHelpTexts extends OmniscriptBaseMixin(LightningElement) {
		@track _type;
		@track _subType;
		
		@track record = {};
		
		@api get type(){
				return this._type;
		}
		set type(value){
				this._type = value;
				this.setRecordObjects();
		}
		
		@api get subType(){
				return this._subType;
		}
		set subType(value){
				this._subType = value;
				this.setRecordObjects();
		}
		
		setRecordObjects(){
				let record = {};
				record.CaseType = this._type;
				record.CaseSubType= this._subType;
				this.record = record;
		}
		
		  @api
			set omniCustomState(data) {
				if (data) {
						console.log('data ',data);
					this._omniCustomState = data;
				}
			}

			get omniCustomState() {
				return this._omniCustomState;
			}
}