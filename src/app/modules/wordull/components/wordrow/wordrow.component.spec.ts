import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WordrowComponent } from './wordrow.component';

describe('WordrowComponent', () => {
  let component: WordrowComponent;
  let fixture: ComponentFixture<WordrowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WordrowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WordrowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
