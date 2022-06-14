import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FileUploadComponent } from './process/file-upload.component';
import { BytesPipe } from './bytes.pipe';



@NgModule({
  declarations: [FileUploadComponent, BytesPipe],
  exports: [FileUploadComponent],
  imports: [
    CommonModule,
    HttpClientModule
  ]
})
export class FileUploadModule { }
