import { Place } from 'src/app/model/weather';
import { ForecastService } from 'src/app/shared/services/forecast.service';

import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-city-card',
    templateUrl: './city-card.component.html',
    styleUrls: ['./city-card.component.scss'],
})
export class CityCardComponent implements OnInit {
    @Input() public city: Place;

    constructor(public forecastService: ForecastService) {}

    ngOnInit(): void {
        // this.forecastService
        //     .getWeatherByCityName(this.city)
        //     .subscribe((x: PartialWeather) => {
        //         this.city.temp = x;
        //     });
    }
}
