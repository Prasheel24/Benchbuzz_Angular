import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServerDownPageComponent } from './server-down-page.component';

describe('ServerDownPageComponent', () => {
  let component: ServerDownPageComponent;
  let fixture: ComponentFixture<ServerDownPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServerDownPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServerDownPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
