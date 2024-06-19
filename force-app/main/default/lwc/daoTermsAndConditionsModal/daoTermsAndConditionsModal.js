import { LightningElement, api } from "lwc";

export default class DaoTermsAndConditionsModal extends LightningElement {
  /** @type {string} - Title */
  name;
  /** @type {string} - Rich Content Body */
  body;
  listener;
  hasScrolled;

  @api async open({ name, body }) {
    this.name = name;
    this.body = body;
    this.template.querySelector("omnistudio-modal").openModal();

    await Promise.resolve();

    if (this.isEndInViewport()) {
      this.hasScrolled = true;
    } else {
      this.handleScroll();
    }
  }

  close() {
    this.template.querySelector("omnistudio-modal").closeModal();
    this.removeListener();
  }

  handleRead() {
    this.dispatchEvent(new CustomEvent("read"));

    this.close();
  }

  get isDisabled() {
    return !this.hasScrolled;
  }

  handleScroll() {
    const scroller = this.template.querySelector(
      ".dao-modal-content-container"
    );

    if (scroller) {
      scroller.addEventListener("scroll", () => {
        if (this.hasScrolled) return;

        const reachedEnd = this.isEndInViewport();
        this.hasScrolled = reachedEnd;
      });
    }
  }

  isEndInViewport() {
    const el = this.template.querySelector(".dao-modal-content-end");

    if (!el) return false;

    const rect = el.getBoundingClientRect();

    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight ||
          document.documentElement.clientHeight) /* or $(window).height() */ &&
      rect.right <=
        (window.innerWidth ||
          document.documentElement.clientWidth) /* or $(window).width() */
    );
  }

  handlePrint() {
    window.print();
  }

  removeListener() {
    this.template
      .querySelector(".dao-modal-content-container")
      .removeEventListener("scroll", this.handleScroll);
  }

  disconnectedCallback() {
    this.removeListener();
  }
}