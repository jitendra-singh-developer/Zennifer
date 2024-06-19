/* eslint-disable no-console */
import { LightningElement, api } from 'lwc';
import getResults from '@salesforce/apex/apiutil.ApiExternalDataComponentController.getResults';

export default class ExternalAlerts extends LightningElement {
    @api recordId;
    @api externalDataCategory;

    dataFields;
    alerts;
    displayList;
    error;

    connectedCallback() {
        
        getResults({ recordId: this.recordId, apiConfigName: this.externalDataCategory, searchFilters: null })
            .then(result => {
                this.dataFields = result.columns;
                this.alerts = result.data;
                this.buildDisplayList();
            })
            .catch(error => {
                this.error = error;
            });
    }

    buildDisplayList() {
        this.displayList = [];
        let alertIdIndex = 1;
        for (const alert of this.alerts) {
            let displayItem = {
                id: `alert-${alertIdIndex++}`,
                fields: [] 
            };
            for (let i=0;i<this.dataFields.length;i++) {
                const field = this.dataFields[i];
                displayItem.fields.push({
                    isFirst: i === 0,
                    label: field.label,
                    value: alert[field.fieldName]
                });
            }
            this.displayList.push(displayItem);
        }
    }

    /**
     * Remove alert from list to hide
     * @param event - mouse event 
     */
    hideAlert(event) {
        let newList = JSON.parse(JSON.stringify(this.displayList));
        newList.splice(event.target.value, 1);
        this.displayList = newList;
    }
}