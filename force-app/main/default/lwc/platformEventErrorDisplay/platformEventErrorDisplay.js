import { LightningElement, wire } from 'lwc';
import { subscribe, unsubscribe, onError } from 'lightning/empApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class PlatformEventErrorDisplay extends LightningElement {
    subscription = null;

    // Subscribe to the platform event when the component is connected
    connectedCallback() {
        this.subscribeToPlatformEvent();
    }

    // Unsubscribe from the platform event when the component is disconnected
    disconnectedCallback() {
        this.unsubscribeFromPlatformEvent();
    }

    subscribeToPlatformEvent() {
        const messageCallback = (response) => {
            this.handleEvent(response);
        };

        const errorCallback = (error) => {
            console.error('Error with CometD', JSON.stringify(error));
        };

        // Subscribe to the platform event
        subscribe('/event/ShowToast__e', -1, messageCallback)
            .then((response) => {
                this.subscription = response;
            })
            .catch(errorCallback);

        onError(errorCallback);
    }

    unsubscribeFromPlatformEvent() {
        if (this.subscription) {
            unsubscribe(this.subscription, (response) => {
                console.log('Unsubscribed from: ', JSON.stringify(response));
            });
        }
    }

    handleEvent(response) {
        const errorToast = new ShowToastEvent({
            title: 'Minimum Product Cart Value is 1',
            variant: 'error'
        });
        this.dispatchEvent(errorToast);
    }
}