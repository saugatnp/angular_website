import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpdtimesComponent } from './opdtimes.component';

describe('OpdtimesComponent', () => {
  let component: OpdtimesComponent;
  let fixture: ComponentFixture<OpdtimesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpdtimesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpdtimesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
