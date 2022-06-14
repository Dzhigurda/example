import { Component, EventEmitter, Injectable, TemplateRef } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MicroModalService {

  open$ = new EventEmitter<TemplateRef<Component>>();
  close$ = new EventEmitter<void>();

  constructor() { }

  open(ref: TemplateRef<Component>) {
    this.open$.emit(ref);
  }

  close() {
    this.close$.emit();
  }
}
