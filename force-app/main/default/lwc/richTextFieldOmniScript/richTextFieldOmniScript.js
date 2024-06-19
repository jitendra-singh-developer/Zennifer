import { LightningElement, api, track } from "lwc";
import { OmniscriptBaseMixin } from "omnistudio/omniscriptBaseMixin";

export default class RichTextFieldOmniScript extends OmniscriptBaseMixin(
  LightningElement
) {
  requiredValue = false;
  @api
  get required() {
    return this.requiredValue;
  }
  set required(value) {
    //console.log('type Value',typeOf value);
    if (value === "true") {
      this.requiredValue = true;
    } else if (value === "false") {
      this.requiredValue = false;
    }
  }

  @api label;
  @api placeholder;
  @track richText;
  @track richTextFormats = [
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "list",
    "indent",
    "align",
    "link",
    "image",
    "clean",
    "table",
    "header",
    "color",
    "background",
    "code",
    "code-block",
    "script",
    "blockquote",
    "direction"
  ];
  handleRichTextChange(event) {
    this.richText = event.detail.value;
    console.log("this.richText ", this.richText);
    let data = {};
    data.richTextDescription = this.richText;
    try {
      this.omniApplyCallResp(data);
    } catch (e) {
      console.log(e);
    }
  }
  connectedCallback() {
    console.log(this.label);
    console.log(this.required);
  }
}