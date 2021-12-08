import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherEveryDayComponent } from './weather-every-day.component';

describe('WeatherEveryDayComponent', () => {
  let component: WeatherEveryDayComponent;
  let fixture: ComponentFixture<WeatherEveryDayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeatherEveryDayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherEveryDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
