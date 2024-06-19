import { LightningElement, api } from "lwc";

export default class DaoConfirmModal extends LightningElement {
  @api confirmLabel = "Yes";
  @api cancelLabel = "No";
  title = "Confirm";
  content = "Are you sure?";
  reference;

  @api open({ reference, content, title }) {
    this.reference = reference;
    this.content = content ?? this.content;
    this.title = title ?? this.title;
    this.template.querySelector("omnistudio-modal").openModal();
  }

  close() {
    this.template.querySelector("omnistudio-modal").closeModal();
  }

  handleCancel() {
    this.close();
  }

  handleConfirm() {
    this.dispatchEvent(
      new CustomEvent("confirm", {
        detail: this.reference
      })
    );
    this.close();
  }
}