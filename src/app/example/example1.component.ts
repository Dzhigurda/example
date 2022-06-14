import { Component, ElementRef, ViewChild } from "@angular/core"; 
import { FileUploadService, UploadedFileDTO } from "../file-upload/file-upload.service";

@Component({
    selector: 'app-example1',
    styleUrls: ['./example1.component.css'],
    template: `
    <div class='center'>
    <div class="product__form-item"> 
        <label class="product__label" for="file">Прикрепить перечень файлом</label>
        <input type="file" #file id="file" multiple (change)="uploadFile()" />
        
        <hr/>

        <p *ngFor="let p of customDescriptionFile">{{p.id}} {{p.name}} {{p.size}}</p>
    </div>
</div>
  `,
})
export class Example1Component {

    customDescriptionFile: UploadedFileDTO[] = [];

    @ViewChild('file', { static: false })
    customeFile!: ElementRef<HTMLInputElement>;

    constructor(private fileUploadService: FileUploadService) { }

    uploadFile() {
        if (this.customeFile.nativeElement.files) {
            this.fileUploadService.uploadFile(
                this.customeFile.nativeElement.files
            ).subscribe({next: file => {
                this.customDescriptionFile.push(...file);
            }, error: (err) => {
                console.log(err.error);
            }});
        }
    }
}