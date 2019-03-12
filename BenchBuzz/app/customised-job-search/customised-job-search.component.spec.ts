import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomizedJobSearchComponent } from './customised-job-search.component';

describe('CustomisedJobSearchComponent', () => {
  let component: CustomizedJobSearchComponent;
  let fixture: ComponentFixture<CustomizedJobSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomizedJobSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomizedJobSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
