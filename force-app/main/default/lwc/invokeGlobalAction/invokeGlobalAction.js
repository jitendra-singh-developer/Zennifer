import { LightningElement, api } from 'lwc';
//import consoleLog from 'c/consoleLog';
//import style from './invokeGlobalAction.css';

export default class InvokeGlobalAction extends LightningElement {
    @api globalActionName;
    @api buttonLabel;
    @api buttonIconName;
    @api variant;
		
    get buttonClassList() {
        let classList = "button slds-p-left_small";
        if(this.variant) {
            classList += " action__" + this.variant;
        }

        return classList;
    }

    handleInvokeGlobalActionButton() {
        const globalActionButton = document.querySelector('.globalCreateTrigger');
        if (globalActionButton) {
           globalActionButton.click();
        }
    }

    handleInvokeGlobalAction() {
        console.log('handleInvokeGlobalAction start');
				var globalActions = document.querySelector('.globalCreateMenuList');
        const actionSelector = `.globalCreateMenuList a[title='${this.globalActionName}']`;
        let action = document.querySelector(actionSelector);

        if (!action) {
            console.log('Global action not found. Triggering handleInvokeGlobalActionButton.');
            this.handleInvokeGlobalActionButton();

            // Requery after triggering the global action button
            action = window.document.querySelector(actionSelector);
						console.log('action ',action);
        }

        if (action) {
            console.log('Global action found. Proceeding with action click.');
            action.click();
        } else {
            console.log('Global action still not found.');
        }

        console.log('handleInvokeGlobalAction end');
    }
}