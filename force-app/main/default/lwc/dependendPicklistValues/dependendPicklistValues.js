import { LightningElement, wire, track , api } from 'lwc';
import { getPicklistValuesByRecordType } from 'lightning/uiObjectInfoApi';
import { OmniscriptBaseMixin } from 'omnistudio/omniscriptBaseMixin';

export default class DependendPicklistValues extends OmniscriptBaseMixin(LightningElement) {
    
		@api 
		get objectName(){
				return this.objectApiName;
		}
		set objectName(value){
				this.objectApiName = value;
		}
		
		@api 
		get recordId(){
				return this.objectRecordTypeId;
		}
		set recordId(value){
				this.objectRecordTypeId = value;
		}
		
		@api
		get controllerFieldName(){
				return this.controllerFieldApiName;
		}
		set controllerFieldName(value){
				this.controllerFieldApiName = value;
		}
		@api 
		get controllerFldLabel(){
				return this.controllerFieldLabel;
		}
		set controllerFldLabel(value){
				this.controllerFieldLabel = value;
		}
		
		@api
		get dependentFieldName(){
				return this.dependentFieldApiName;
		}
		set dependentFieldName(value){
				this.dependentFieldApiName = value;
		}
		@api 
		get dependentFldLabel(){
				return this.dependentFieldLabel;
		}
		set dependentFldLabel(value){
				this.dependentFieldLabel = value;
		}
    @track objectApiName;
    @track objectRecordTypeId;
    @track controllerFieldApiName;
    @track controllerFieldLabel;
    @track dependentFieldApiName;
    @track dependentFieldLabel;
     
    @track controllerValue;
    @track dependentValue;
 
    @track controllingPicklist=[];
    @track dependentPicklist;
    @track finalDependentVal=[];
    @track selectedControlling="--None--";
  
		
		connectedCallback(){
				console.log('objectRecordTypeId', this.objectRecordTypeId);
				console.log('objectApiName', this.objectApiName);
				console.log('con field',this.controllerFieldApiName);
					console.log('dep field',this.dependentFieldApiName);
		}
		renderedCallback(){
				console.log('objectRecordTypeId', this.objectRecordTypeId);
				console.log('objectApiName', this.objectApiName);
				console.log('con field',this.controllerFieldApiName);
					console.log('dep field',this.dependentFieldApiName);
		}
		
    showpicklist = false;
    dependentDisabled=true;
    showdependent = false;
    @wire(getPicklistValuesByRecordType, { objectApiName: '$objectApiName', recordTypeId: '$objectRecordTypeId' })
    fetchPicklist({error,data}){
        if(data && data.picklistFieldValues){
            let optionsValue = {}
            optionsValue["label"] = "--None--";
            optionsValue["value"] = "";
         //   this.controllingPicklist.push(optionsValue);
						var ctrlPicklist = [];
						ctrlPicklist.push(optionsValue);
            data.picklistFieldValues[this.controllerFieldApiName].values.forEach(optionData => {
								let option = {label: optionData.label, value: optionData.value};
								ctrlPicklist.push(option);
               // this.controllingPicklist.push({label : optionData.label, value : optionData.value});
            });
 						this.controllingPicklist = ctrlPicklist;
						console.log('controllingPicklist',this.controllingPicklist);
            this.dependentPicklist = data.picklistFieldValues[this.dependentFieldApiName];
            this.showpicklist = true;
        } else if(error){
            console.log(error);
        }
    }
 
    fetchDependentValue(event){
        console.log(event.target.value);
        this.dependentDisabled = true;
        this.finalDependentVal=[];
        this.showdependent = false;
        const selectedVal = event.target.value;
        this.controllerValue = selectedVal;
        this.finalDependentVal.push({label : "--None--", value : ""})
        let controllerValues = this.dependentPicklist.controllerValues;
        this.dependentPicklist.values.forEach(depVal => {
            depVal.validFor.forEach(depKey =>{
                if(depKey === controllerValues[selectedVal]){
                    this.dependentDisabled = false;
                    this.showdependent = true;
                    this.finalDependentVal.push({label : depVal.label, value : depVal.value});
                }
            });
              
        });
				this.sendDataToOmni();
    }
 
    handleDependentPicklist(event){
        this.dependentValue = event.target.value;
       	this.sendDataToOmni();
    }
		
		sendDataToOmni(){
				let data = {};
				data[this.controllerFieldApiName] = this.controllerValue;
				data[this.dependentFieldApiName] = this.dependentValue;
				console.log('Data to be send to omni', data);
				 this.omniApplyCallResp(data);
		}
}