import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGroupToChannelDialogComponent } from './add-group-to-channel-dialog.component';

describe('AddGroupToChannelDialogComponent', () => {
  let component: AddGroupToChannelDialogComponent;
  let fixture: ComponentFixture<AddGroupToChannelDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddGroupToChannelDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddGroupToChannelDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
