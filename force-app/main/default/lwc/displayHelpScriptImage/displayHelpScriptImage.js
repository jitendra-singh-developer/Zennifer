import { LightningElement, api, track } from 'lwc';
export default class DisplayHelpScriptImage extends LightningElement {
		
		@track imageLink;
		@track showImageModal = false;
		
		@api
		get contentVersionId(){
				return this.imageLink;
		}
		set contentVersionId(value){
				this.imageLink = '/sfc/servlet.shepherd/version/download/'+value;
		}
		
		closeModal(){
				this.showImageModal = false;
		}
		
		openModal(){
				this.showImageModal = true;
		}
}