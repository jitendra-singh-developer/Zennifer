import { LightningElement, track, api } from "lwc";
import { OmniscriptBaseMixin } from "omnistudio/omniscriptBaseMixin";
import { cloneDeep } from "omnistudio/lodash";

export default class FinancialTransactionMultiSelectFlexCard extends OmniscriptBaseMixin(LightningElement) {

			@track _records = [];
  @track _omniCustomState;
  @track _omniJsonDef;
  @track selectedRecords = [];

  UNIQUE_RECORD_KEY = "Id";
  SORT_KEY = "Name";
  SAVED_STATE_KEY = "transactionSavedList";

  @api
  set records(data) {
    if (data) {
				var modData = JSON.parse(JSON.stringify(data));
				//console.log('modData ',modData);
      this.restoreData(modData);
    }
  }

  get records() {
    return this._records;
  } 
		
  @api
  set omniCustomState(data) {
    if (data) {
      this._omniCustomState = data;
    }
  }

  get omniCustomState() {
    return this._omniCustomState;
  }

	@api nodeName;
		
		connectedCallback(){
				//console.log('records ',this._records);
				//console.log('omniadata ', this._omniCustomState);
		}
		
  restoreData(data) {
    //console.log('omnistate ',this._omniCustomState);
    //console.log('sel rec lenght ',this.selectedRecords.length);
    if (this.selectedRecords.length === 0 && this._omniCustomState !== undefined) {
          this._records = cloneDeep(data);
          this.selectedRecords = cloneDeep(this._omniCustomState[this.SAVED_STATE_KEY]);
          let restoredRecordsList = cloneDeep(this._omniCustomState.savedList);

          this._records = this.merge(this._records,restoredRecordsList,this.UNIQUE_RECORD_KEY);
          //console.log('_records if ',this._records);
        /*  this._records.sort(function(a, b){
              return a[this.SORT_KEY] - b[this.SORT_KEY];
          }); */
    } else {
          this._records = cloneDeep(data);
          //console.log('_records else ',this._records);
				//console.log('sort Key ', this.SORT_KEY);
         /* this._records.sort(function(a, b){
            return a[this.SORT_KEY] - b[this.SORT_KEY];
          });*/
        }
  }

  merge(a, b, prop) {
    let reduced = a.filter(
      (aitem) =>
        !b.find((bitem) => {
          delete bitem.originalIndex;
          return aitem[prop] === bitem[prop];
        })
    );
    return reduced.concat(b);
  }

  getTransactionSelectHandler(event) {
			//console.log('In selected Rows ');
			//console.log('event.detail.result', JSON.parse(JSON.stringify(event.detail.result)));
    if (event.detail.result === "all") {
      this.selectedRecords = [];
      this.selectedRecords = cloneDeep(this.records);
      this.selectedRecords.forEach((item) => {
        item.selectrow = true;
      });
    } else if (event.detail.result === "none") {
      this.selectedRecords = [];
    } else {
      let selectedItem = event.detail.result;
      //delete selectedItem.originalIndex;

      if (selectedItem.selectrow === false) {
        this.selectedRecords = this.selectedRecords.filter(
          (item) =>
            item[this.UNIQUE_RECORD_KEY] !==
            selectedItem[this.UNIQUE_RECORD_KEY]
        );
      } else {
        this.selectedRecords.push(selectedItem);
      }
    }
    this.selectedRecords = this.selectedRecords.map((row) => ({
      ...row,
      vlcSelected: true
    }));
			var dataToSend = {};
			dataToSend[this.nodeName] = this.selectedRecords;
    this.omniApplyCallResp(dataToSend);
    this.omniSaveState(this.selectedRecords, this.SAVED_STATE_KEY);
  }
		
}