import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabreportdownloadComponent } from './labreportdownload.component';

describe('LabreportdownloadComponent', () => {
  let component: LabreportdownloadComponent;
  let fixture: ComponentFixture<LabreportdownloadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LabreportdownloadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LabreportdownloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
