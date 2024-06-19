import { LightningElement, api } from "lwc";

export default class DaoHomeCards extends LightningElement {
  @api accountType;
  @api country;

  get isUnselected() {
    return !this.isCommercial && !this.isConsumer;
  }

  get isCommercial() {
    return this.accountType === "Commercial";
  }

  get isConsumer() {
    return this.accountType === "Consumer";
  }

  get retirementAccountLabel() {
    return this.country === "Canada"
      ? "Tax-Free Savings Account"
      : "Individual Retirement Account";
  }

  get retirementAccountAbbr() {
    return this.country === "Canada" ? "TFSA" : "IRA";
  }

  get certificateAccountLabel() {
    return this.country === "Canada"
      ? "Guaranteed Investment Certificate"
      : "Certificate of Deposit";
  }

  get certificateAccountAbbr() {
    return this.country === "Canada" ? "GIC" : "CD";
  }
}