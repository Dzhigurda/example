import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { debounceTime, distinctUntilChanged, Subscription, switchMap, take } from 'rxjs';
import { FileUploadService, UploadedFileDTO } from 'src/app/file-upload/file-upload.service';
import { AppState, ChangeUser, GenderType, SetUserAvatar, UserDTO, UserFormDTO } from '../business';
import { MicroModalService } from '../micro-modal/micro-modal.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-edit-user-form',
  templateUrl: './edit-user-form.component.html',
  styleUrls: ['../common.scss', './edit-user-form.component.scss']
})
export class EditUserFormComponent implements OnInit, OnDestroy {
  iam = 0;
  form = new FormGroup({
    id: new FormControl<number>(0, [Validators.required]),
    name: new FormControl<string>("", [Validators.required]),
    gender: new FormControl<GenderType>("MAN", [Validators.required]),
  })

  @Input()
  user?: UserDTO;

  private sub$: Subscription[] = [];
  set sub(sub: Subscription) {
    this.sub$.push(sub);
  }
  constructor(
    private store: Store<AppState>,
    private modal: MicroModalService,
    private service: UserService,
    private fileUploadService: FileUploadService,
  ) { }

  ngOnInit(): void {

    this.sub = this.store.select((state) => state.current_user).subscribe(iam => {
      this.iam = iam ?? 0;
    })
    this.sub = this.store.select((state) => state.users.find(r => r.id === this.user?.id ?? state.current_user)).pipe(take(1)).subscribe(user => {
      this.form.setValue(user!.getModelForEdit());
    })

    this.sub = this.form.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
    ).subscribe(r => {
      this.onSave();
    })

  }


  @ViewChild('file', { static: false })
  customeFile!: ElementRef<HTMLInputElement>;


  uploadFile() {
    if (this.customeFile.nativeElement.files) {
      this.fileUploadService.uploadFile(
        this.customeFile.nativeElement.files
      ).pipe(switchMap((files: UploadedFileDTO[]) => {
        return this.service.patch(this.user!.id!, { id: this.user!.id!, avatar: `http://localhost:4202/avatar/${files[0].name}` })
      }))
        .subscribe({
          next: user => {
            // change avatar file[0] 
            this.store.dispatch(new SetUserAvatar({ id: user.id!, avatar: user.avatar! }));
          }, error: (err) => {
            console.log(err.error);
          }
        });
    }
  }
  onSave() {
    if (!this.form.valid) return;
    const userFormDTO = this.form.getRawValue() as UserFormDTO;
    // this.store.dispatch(new ChangeUser(userFormDTO))
    this.service.patch(userFormDTO.id, userFormDTO).subscribe();
  }

  ngOnDestroy(): void {
    this.sub$.forEach(s => s.unsubscribe());
  }

  enterDetect(event: KeyboardEvent) {
    console.log(event.key === 'Enter')
    if (event.key === 'Enter') {
      this.modal.close();
    }
  }
}
