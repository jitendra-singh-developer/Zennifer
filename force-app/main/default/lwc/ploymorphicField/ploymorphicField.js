import { LightningElement, api, track } from 'lwc';

export default class PloymorphicField extends LightningElement {
    
    _objectValues = [];
    
    @api
    get objectValues(){
        return this._objectValues;
    }
    set objectValues(value){
        let objectOptions = [];
        if(value.contains(';')){
            let objectList = value.split(';');
            objectList.forEach((objectName)=>{
                let option = {};
                option.label = objectName;
                option.value = objectName;
                objectOptions.push(option);
            });
            
        }else{
            let option = {};
            option.label = value;
            option.value = value;
            objectOptions.push(option);
        }
        this._objectValues = objectOptions;
    }
}