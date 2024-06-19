import { LightningElement, api, track } from 'lwc';
import { OmniscriptBaseMixin } from 'omnistudio/omniscriptBaseMixin';

export default class CaseHelpTextLWCExt extends OmniscriptBaseMixin(LightningElement) {
		
		@track _type;
		@track _subType;
		@track _restrictionType;
		
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
		
		@api get restrictionType(){
				return this._restrictionType;
		}
		set restrictionType(value){
				this._restrictionType =value;
				this.setRecordObjects();
		}
		
		
		setRecordObjects(){
				let record = {};
				record.Type = this._type;
				record.SubType= this._subType;
				record.RestrictionType = this._restrictionType;
				console.log('Case Help Text flex card parent data',JSON.parse(JSON.stringify(record)));
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