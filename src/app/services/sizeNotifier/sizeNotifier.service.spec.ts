import { TestBed } from '@angular/core/testing';

import { SizeNotifierService } from './sizeNotifier.service';

describe('SizeNotifierService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SizeNotifierService = TestBed.get(SizeNotifierService);
    expect(service).toBeTruthy();
  });
});
