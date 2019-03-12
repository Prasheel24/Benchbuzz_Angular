import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateProfileNewComponent } from './update-profile-new.component';

describe('UpdateProfileNewComponent', () => {
  let component: UpdateProfileNewComponent;
  let fixture: ComponentFixture<UpdateProfileNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateProfileNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateProfileNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
