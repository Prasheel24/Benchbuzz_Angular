import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailDescriptionRrdComponent } from './detail-description-rrd.component';

import { DialogComponent} from '../dialog/dialog.component';

describe('DetailDescriptionRrdComponent', () => {
  let component: DetailDescriptionRrdComponent;
  let fixture: ComponentFixture<DetailDescriptionRrdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogComponent,DetailDescriptionRrdComponent ]
  
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailDescriptionRrdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
