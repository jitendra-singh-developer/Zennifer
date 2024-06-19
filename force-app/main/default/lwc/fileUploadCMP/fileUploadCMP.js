import { LightningElement, api, track, wire} from 'lwc';
import { deleteRecord } from 'lightning/uiRecordApi';
import { OmniscriptBaseMixin } from 'omnistudio/omniscriptBaseMixin';

export default class FileUploadCMP extends OmniscriptBaseMixin(LightningElement) {
    @api label;
    
    @track documentIds = [];

    @track showFiles = false;

    @track files = [];

    handleUploadFinished(event){
        console.log('file uploaded');
        console.log('details ',JSON.parse(JSON.stringify(event.detail)));
        this.showFiles = false;
        let documentIds = [];
        let files = [];
        var existingFileCount = this.files.length;
        
        const uploadedFiles = event.detail.files;

        var count = 0;
        uploadedFiles.forEach((file)=>{
            documentIds.push(file.documentId);
            
            let newfile = {};
            count = count +1;
            newfile.Id = file.documentId;
            newfile.Name = file.name;
            newfile.type = file.mimeType;
            existingFileCount = existingFileCount +count;
            newfile.Number = existingFileCount;
            files.push(newfile);
        });

				let newFilesArray = [...this.files,...files];
				let newDocumentsArray = [...this.documentIds, ...documentIds];
        this.files = newFilesArray;
        this.documentIds = newDocumentsArray;

        console.log('files ', JSON.parse(JSON.stringify(this.files)));
        console.log('documentIds ', JSON.parse(JSON.stringify(this.documentIds)));

        let data ={};
        data.fileIds = JSON.parse(JSON.stringify(this.documentIds));
        this.showFiles = true;
        console.log('data ',JSON.parse(JSON.stringify(data)));
        this.omniApplyCallResp(data);
    }

    deleteFile(event){
        var fileId = event.target.accessKey;

        deleteRecord(
            fileId
        ).then((response)=>{ 
            console.log('response ',response);
            console.log('file deleted successfully');  
            const fileIndex = this.documentIds.indexOf(fileId);
            if(fileIndex > -1){
                this.documentIds.splice(fileIndex, 1);
            }
            console.log('After delete docIds', this.documentIds);
            var fileIndex2;
            this.files.forEach(file=>{
                if(file.Id === fileId){
                    fileIndex2 = this.files.indexOf(file);
                }
            })
            if(fileIndex2 > -1){
                this.files.splice(fileIndex2, 1);
            }
            console.log('After Delete files ', this.files);


        }).catch((error)=>{
            console.log('error in deleting file',error);
        });
       
    }
        
}