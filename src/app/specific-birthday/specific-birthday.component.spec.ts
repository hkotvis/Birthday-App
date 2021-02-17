import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecificBirthdayComponent } from './specific-birthday.component';

describe('SpecificBirthdayComponent', () => {
  let component: SpecificBirthdayComponent;
  let fixture: ComponentFixture<SpecificBirthdayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecificBirthdayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecificBirthdayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
