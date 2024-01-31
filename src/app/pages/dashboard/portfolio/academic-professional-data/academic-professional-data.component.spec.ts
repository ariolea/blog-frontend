import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcademicProfessionalDataComponent } from './academic-professional-data.component';

describe('AcademicProfessionalDataComponent', () => {
  let component: AcademicProfessionalDataComponent;
  let fixture: ComponentFixture<AcademicProfessionalDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AcademicProfessionalDataComponent]
    });
    fixture = TestBed.createComponent(AcademicProfessionalDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
