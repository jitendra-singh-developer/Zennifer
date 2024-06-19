import { LightningElement, api, track } from 'lwc';
import { OmniscriptBaseMixin } from 'omnistudio/omniscriptBaseMixin';
export default class CaseHelpTextFlexCard extends OmniscriptBaseMixin(LightningElement) {
		@track _type;
		@track _subType;
		@track _recordTypeName;
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
		
		@api get recordTypeName(){
				return this._recordTypeName;
		}
		set recordTypeName(value){
				this._recordTypeName = value;
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
				record.RecordTypeName = this._recordTypeName;
				record.RestrictionType = this._restrictionType;
				console.log('record',record);
				
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
		
		connectedCallback(){
				console.log('type', this.type);
				console.log('recordTypeName', this.recordTypeName);
				console.log('this._omniCustomState');
		}
}