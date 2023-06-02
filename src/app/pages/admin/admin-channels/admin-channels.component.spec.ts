import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminChannelsComponent } from './admin-channels.component';

describe('AdminChannelsComponent', () => {
  let component: AdminChannelsComponent;
  let fixture: ComponentFixture<AdminChannelsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminChannelsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminChannelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
