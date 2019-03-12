import { TestBed, inject } from '@angular/core/testing';

import { FindAnAssignmentSllListService } from './find-an-assignment-sll-list.service';

describe('FindAnAssignmentSllListService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FindAnAssignmentSllListService]
    });
  });

  it('should be created', inject([FindAnAssignmentSllListService], (service: FindAnAssignmentSllListService) => {
    expect(service).toBeTruthy();
  }));
});
