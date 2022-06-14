import { TestBed } from '@angular/core/testing';

import { MicroModalService } from './micro-modal.service';

describe('MicroModalService', () => {
  let service: MicroModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MicroModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
