import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FindAnAssignmentSllListComponent } from './find-an-assignment-sll-list.component';

describe('FindAnAssignmentSllListComponent', () => {
  let component: FindAnAssignmentSllListComponent;
  let fixture: ComponentFixture<FindAnAssignmentSllListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FindAnAssignmentSllListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FindAnAssignmentSllListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
