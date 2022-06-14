import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core'; 
import { Subscription } from 'rxjs';
import { FileUploadService, LoadedValue } from '../file-upload.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileUploadComponent implements OnInit, OnDestroy {
  process: LoadedValue[] = [];

  private sub!: Subscription;
  constructor(private fileUpload: FileUploadService, private ref: ChangeDetectorRef) {}

  ngOnInit(): void {
      this.sub = this.fileUpload.fileInProcess.subscribe(r => {
        this.process = r
        this.ref.detectChanges();
        console.log(this.process);
      });
  }

  getProcent(value: LoadedValue) {
    return Math.round(((value.loaded ?? 0) / (value.total ?? 1)) * 10000) / 100;
  }

  cancel(id: number) {
    this.fileUpload.deleteProcess(id);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
