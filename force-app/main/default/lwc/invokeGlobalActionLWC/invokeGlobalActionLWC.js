import { LightningElement, api } from 'lwc';

export default class InvokeGlobalActionLWC extends LightningElement {
	 	@api globalActionName;
    @api buttonLabel;
    @api buttonIconName;
		@api objectId;
    @api variant;
		@api objectName = 'Account';
		
    get buttonClassList() {
        let classList = "button slds-p-left_small";
        if(this.variant) {
            classList += " action__" + this.variant;
        }

        return classList;
    }
		
		handleInvokeGlobalAction(){
			this.invoke();
		}
		invoke(){
				const globalActionEvent = new CustomEvent('force:createRecord', {
					detail: {
						entityApiName: this.objectName,
						recordTypeId: '',
						defaultFieldValues: {
							AccountId: this.objectId
						}
					}
				});

				// Dispatch the event to open the global action popup
				this.dispatchEvent(globalActionEvent);
		}
}