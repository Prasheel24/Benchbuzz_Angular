import { TestBed, inject } from '@angular/core/testing';

import { ApplicationStatusListService } from './application-status-list.service';

describe('ApplicationStatusListService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApplicationStatusListService]
    });
  });

  it('should be created', inject([ApplicationStatusListService], (service: ApplicationStatusListService) => {
    expect(service).toBeTruthy();
  }));
});
