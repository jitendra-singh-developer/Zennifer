import { LightningElement, api } from "lwc";

export default class DaoAccountsCreated extends LightningElement {
  @api accounts;
  accountsCreated;

  connectedCallback() {
    this.accountsCreated = this.accounts?.map((account) => {
      return {
        Name: account.Name,
        Number: this.getRandomNumber()
      };
    });
  }

  getRandomNumber() {
    return Math.random().toString().slice(2, 9);
  }
}