import { TestBed } from '@angular/core/testing';

import { Livre } from '../Modules/livresModule';

describe('Livre', () => {
  let service: Livre;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Livre);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
