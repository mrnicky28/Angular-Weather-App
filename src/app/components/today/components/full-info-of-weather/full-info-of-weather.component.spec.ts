import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullInfoOfWeatherComponent } from './full-info-of-weather.component';

describe('FullInfoOfWeatherComponent', () => {
  let component: FullInfoOfWeatherComponent;
  let fixture: ComponentFixture<FullInfoOfWeatherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FullInfoOfWeatherComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FullInfoOfWeatherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
