import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YoutubeTrendsComponent } from './youtube-trends.component';

describe('YoutubeTrendsComponent', () => {
  let component: YoutubeTrendsComponent;
  let fixture: ComponentFixture<YoutubeTrendsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YoutubeTrendsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YoutubeTrendsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
