import { LightningElement, api, track, wire } from 'lwc';
import { getPicklistValues } from "lightning/uiObjectInfoApi";
import { OmniscriptBaseMixin } from 'omnistudio/omniscriptBaseMixin';

export default class RecordTypeDependentPicklistCMP extends OmniscriptBaseMixin(LightningElement) {

    @api objectApiName;
    @api recordTypeId;
    @api fieldApiName;

    @track options = [];
    @track value;

    omniDataJson;
    renderedCallback(){
        console.log('objectApiName' , this.objectApiName);
        console.log('recordTypeId' , this.recordTypeId);
        console.log('fieldApiName' , this.fieldApiName);
      //  this.template.addEventListener( 'omniaggregate', this.omniUpdateHandler.bind(this));
    }

    @wire(getPicklistValues, {recordTypeId: '$recordTypeId', fieldApiName: '$fieldApiName'})
    picklistValues(response){
        const {error, data} = response;
        if(data){
            console.log('Get picklist data', data);
            let options= [];
            var picklistValues = JSON.parse(JSON.stringify(data.values));
            picklistValues.forEach((val) => {
                let option = {};
                option.label= val.label;
                option.value= val.value;
                options.push(option);
            });
            this.options = options;
            console.log('options',options);
        }else if(error){
            console.log('Get type Picklist Errror', error);
        }
    }

    handleChange(event){
        this.value = event.detail.value;
        console.log('this.value ', this.value);
        let data = {};
        data.type = this.value;
        try{
            this.omniApplyCallResp(data);
        }catch(e){
            console.log(e);
        }
        
    }

    omniUpdateHandler(event){
        console.log('In omniUpdatehandler ');
        console.log(JSON.parse(event.detail));
        if(this.omniDataJson.hasOwnProperty('type')){
            this.omniDataJson['type'] = this.value;
        }else {
            this.omniDataJson['type'] = this.value;
        }
    };
}