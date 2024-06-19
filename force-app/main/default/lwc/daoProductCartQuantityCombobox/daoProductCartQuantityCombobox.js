import { LightningElement } from 'lwc';


const MAX_OPTION_QUANTITY = 5;

export default class DaoProductCartQuantityCombobox extends LightningElement {

    value = 1;

      // used to provide options for the requested product quantity
  get options() {

    return [
      {label: '1', value: 1},
      {label: '2', value: 2},
      {label: '3', value: 3},
      {label: '4', value: 4},
      {label: '5', value: 5},
      {label: 'specify amount', value: 'customAmount'}
    ]
  }


  // used to capture the quantity of products
  handleQuantityOptionChange(event) {
    this.value = event.detail.value;
    console.log(this.value);
  }


}