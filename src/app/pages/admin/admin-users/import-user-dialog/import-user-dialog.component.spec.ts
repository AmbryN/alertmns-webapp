import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportUserDialogComponent } from './import-user-dialog.component';

describe('ImportUserDialogComponent', () => {
  let component: ImportUserDialogComponent;
  let fixture: ComponentFixture<ImportUserDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ImportUserDialogComponent]
    });
    fixture = TestBed.createComponent(ImportUserDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
