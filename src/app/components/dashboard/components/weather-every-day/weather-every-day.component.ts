import { pluck } from 'rxjs/operators';
import { CityData, WeatherNow } from 'src/app/model/weather';
import { ForecastService } from 'src/app/shared/services/forecast.service';

import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-weather-every-day',
    templateUrl: './weather-every-day.component.html',
    styleUrls: ['./weather-every-day.component.scss'],
})
export class WeatherEveryDayComponent implements OnInit {
    cityData: CityData[];
    weatherData: WeatherNow[] = [];

    constructor(private forecastService: ForecastService) {}

    ngOnInit(): void {
        this.getLocationWeather();
        this.forecastService.currentData.subscribe((data) => {
            (this.cityData = data), this.getCityData();
        });
    }

    getLocationWeather() {
        this.forecastService
            .getWeatherForecast()
            .pipe(pluck('list'))
            .subscribe((data) => {
                this.futureForecast(data);
            });
    }

    getCityData() {
        this.weatherData = [];
        this.forecastService
            .getWeatherByCityName(this.cityData)
            .pipe(pluck('list'))
            .subscribe((data) => {
                this.futureForecast(data);
            });
    }

    futureForecast(data) {
        for (let i = 0; i < data.length; i = i + 8) {
            this.weatherData.push(data[i]);
        }
    }
}
