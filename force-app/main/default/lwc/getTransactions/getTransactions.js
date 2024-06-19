import { LightningElement, track,api,wire} from 'lwc';
import callMuleSoftAPI from '@salesforce/apex/GetTransactionsController.callMuleSoftAPI';

export default class ExampleLWC extends LightningElement {
    @api recordId;
    rowOffset = 0;
    @track error;
    @track transactionData;
    @track isLoading = false;

    tableColumns = [
        { label: 'Transaction Id', fieldName: 'SequenceNumber'},
        { label: 'Transaction Date', fieldName: 'EffectiveDate'},
        {label: 'Description', fieldName: 'Comment'},
        { label: 'Transaction Type', fieldName: 'ActionCode'},
        { label: 'Amount', fieldName: 'BalanceChange'},
        {label: 'Running Balance', fieldName: 'NewBalance'}  
        
    ];

    handleGetTransactions() {
        this.isLoading = true;
        callMuleSoftAPI({ finAccountId: this.recordId })
            .then(result => {
                if (result.error) {
                this.error = result.error;
                this.transactionData = false;
                } else {
                    this.transactionData = result.result;
                    console.log(this.transactionData);
                    this.error = false;
                }
                this.isLoading = false;
            })
            .catch(error => {
                this.error = error.body.message;
                this.transactionData = false;               
            });
    }
}