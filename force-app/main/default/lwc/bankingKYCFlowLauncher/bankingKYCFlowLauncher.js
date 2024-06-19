import { LightningElement, api } from 'lwc';

export default class BankingKYCFlowLauncher extends LightningElement {
    @api recordId;

    get inputVariables() {
        return [
            {
                name: 'recordId',
                type: 'String',
                value: this.recordId
            },
        ];
    }
}