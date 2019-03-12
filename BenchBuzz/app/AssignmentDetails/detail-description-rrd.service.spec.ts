import { TestBed, inject } from '@angular/core/testing';

import { DetailDescriptionRRDService } from './detail-description-rrd.service';

describe('DetailDescriptionRrdService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DetailDescriptionRRDService]
    });
  });

  it('should be created', inject([DetailDescriptionRRDService], (service: DetailDescriptionRRDService) => {
    expect(service).toBeTruthy();
  }));
});
