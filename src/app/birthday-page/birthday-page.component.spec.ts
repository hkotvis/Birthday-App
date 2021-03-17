import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BirthdayPageComponent } from './birthday-page.component';

describe('BirthdayPageComponent', () => {
  let component: BirthdayPageComponent;
  let fixture: ComponentFixture<BirthdayPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BirthdayPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BirthdayPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
