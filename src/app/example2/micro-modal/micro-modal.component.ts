import { Component, OnInit, TemplateRef } from '@angular/core';
import { MicroModalService } from './micro-modal.service';

@Component({
  selector: 'app-micro-modal',
  templateUrl: './micro-modal.component.html',
  styleUrls: ['./micro-modal.component.scss']
})
export class MicroModalComponent implements OnInit {

  template?: TemplateRef<Component>;
  constructor(private microModal: MicroModalService) { }

  ngOnInit(): void {
    this.microModal.close$.subscribe(r => {
      this.template = undefined;
    })
    this.microModal.open$.subscribe(r => {
      this.template = r;
    })
  }

  close() {
    this.microModal.close();
  }
}
