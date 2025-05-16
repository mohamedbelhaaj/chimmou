import { TestBed } from '@angular/core/testing';

import { EnseignantService } from './enseignants.service';

describe('Enseignants', () => {
  let service: EnseignantService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnseignantService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
