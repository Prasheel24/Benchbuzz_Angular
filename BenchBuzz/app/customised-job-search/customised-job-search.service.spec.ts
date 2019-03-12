import { TestBed, inject } from '@angular/core/testing';

import { CustomisedJobSearchService } from './customised-job-search.service';

describe('CustomisedJobSearchService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CustomisedJobSearchService]
    });
  });

  it('should be created', inject([CustomisedJobSearchService], (service: CustomisedJobSearchService) => {
    expect(service).toBeTruthy();
  }));
});
