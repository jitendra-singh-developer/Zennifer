import { LightningElement, api } from "lwc";
import { OmniscriptBaseMixin } from "omnistudio/omniscriptBaseMixin";

export default class DaoGettingStarted extends OmniscriptBaseMixin(
  LightningElement
) {
  @api recommendationsPage;
  @api recommendationsParams;
  @api productsPage;
  @api productsParams;
}