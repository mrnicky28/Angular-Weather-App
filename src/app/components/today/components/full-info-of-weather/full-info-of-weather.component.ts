import { Subscription } from 'rxjs';
import {
    CityData, DataToday, OneWeather, Place, TimeLine, WeatherNow
} from 'src/app/model/weather';
import { ForecastService } from 'src/app/shared/services/forecast.service';

import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-full-info-of-weather',
    templateUrl: './full-info-of-weather.component.html',
    styleUrls: ['./full-info-of-weather.component.scss'],
})
export class FullInfoOfWeatherComponent implements OnInit {
    sub: Subscription;
    clock = Date.now();
    cityData: CityData[];
    timeline: TimeLine[];
    dataToday: DataToday;
    weatherNow: WeatherNow;
    currentTime = new Date();
    public cityDetail: Place;

    constructor(private forecastService: ForecastService) {}

    ngOnInit(): void {
        this.getLocationWeatherCity();
        this.forecastService.currentData.subscribe((data) => {
            (this.cityData = data), this.getCityNowWeather();
        });
        this.sub = this.forecastService.subject.subscribe((result: OneWeather) => {
            console.log('result', result);

            this.cityDetail = {
                name: result.timezone,
                lat: result.lat,
                lon: result.lon,
                added: result.added,
            };
            console.log('cityDetail', this.cityDetail);
        });
    }

    addCity() {
        this.cityDetail.added = true;
        this.forecastService.addCity({ ...this.cityDetail });
        console.log(this.cityDetail);
    }

    removeCity() {
        console.log('removwcitycomponent');
        this.cityDetail.added = false;
        this.forecastService.removeCity({ ...this.cityDetail });
    }

    getLocationWeatherCity() {
        this.forecastService.getWeatherForecast().subscribe((data) => {
            this.dataToday = data;
            this.getTodayForecast(data);
            this.getTime();
        });
    }
    getCityNowWeather() {
        this.forecastService
            .getWeatherByCityName(this.cityData)
            .subscribe((data) => this.getTodayForecast(data));
    }

    getTime() {
        setInterval(() => {
            this.clock = Date.now();
        }, 1000);
    }

    dateRange() {
        const start = new Date();
        start.setHours(start.getHours() + start.getTimezoneOffset() / 60);
        const to = new Date(start);
        to.setHours(to.getHours() + 2, to.getMinutes() + 59, to.getSeconds() + 59);
        return { start, to };
    }

    getTodayForecast(today: DataToday) {
        this.timeline = [];
        this.dataToday = today;

        for (const forecast of today.list.slice(0, 8)) {
            this.timeline.push({
                time: forecast.dt_txt,
                temp: forecast.main.temp,
            });
            const apiDate = new Date(forecast.dt_txt).getTime();

            if (
                this.dateRange().start.getTime() <= apiDate &&
                this.dateRange().to.getTime() >= apiDate
            ) {
                this.weatherNow = forecast;
            }
        }
    }
}
