import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChannelSidePanelComponent } from './channel-side-panel.component';

describe('SidePanelComponent', () => {
  let component: ChannelSidePanelComponent;
  let fixture: ComponentFixture<ChannelSidePanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChannelSidePanelComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ChannelSidePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
