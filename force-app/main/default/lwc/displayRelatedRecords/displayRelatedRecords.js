import { LightningElement, api, track, wire } from 'lwc';
import { OmniscriptBaseMixin } from "omnistudio/omniscriptBaseMixin";

export default class DisplayRelatedRecords extends OmniscriptBaseMixin(LightningElement) {
    @track _records = [];
		
		@track showFlexCard = false;
		
		@api parentRecords = [];
		
		@api
    get records(){
        return this._records;
    }
    set records(value){
				this.showFlexCard = false;
				console.log('value ',JSON.parse(JSON.stringify(value)));
        this._records = value;
				if(this._records !== null){
				this.showFlexCard = true;
	
				}

    }

    @track count =0;

    renderedCallback(){
        ++this.count;
        console.log('rendered times ',this.count);
        console.log('_records ',this._records);
				console.log('parentRecords ' ,this.parentRecords);
    }


}