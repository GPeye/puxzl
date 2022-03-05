import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuessgridComponent } from './guessgrid.component';

describe('GuessgridComponent', () => {
  let component: GuessgridComponent;
  let fixture: ComponentFixture<GuessgridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GuessgridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GuessgridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
