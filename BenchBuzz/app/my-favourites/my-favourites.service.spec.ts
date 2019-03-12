import { TestBed, inject } from '@angular/core/testing';

import { MyFavouritesService } from './my-favourites.service';

describe('MyFavouritesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MyFavouritesService]
    });
  });

  it('should be created', inject([MyFavouritesService], (service: MyFavouritesService) => {
    expect(service).toBeTruthy();
  }));
});
