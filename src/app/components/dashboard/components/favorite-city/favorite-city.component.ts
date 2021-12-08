import { Subscription } from 'rxjs';
import { Place } from 'src/app/model/weather';
import { ForecastService } from 'src/app/shared/services/forecast.service';

import { AfterViewInit, Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-favorite-city',
    templateUrl: './favorite-city.component.html',
    styleUrls: ['./favorite-city.component.scss'],
})
export class FavoriteCityComponent implements OnInit, AfterViewInit {
    citiesSub: Subscription;
    cities: Place[];

    constructor(public forecastService: ForecastService) {}

    ngOnInit(): void {
        this.citiesSub = this.forecastService.cityUpdatedSub.subscribe(
            (cities: Place[]) => (this.cities = cities),
        );
    }

    ngAfterViewInit() {
        this.forecastService.getCities();
    }
    loadWeather(city: Place) {
        this.forecastService.citySub.next({ ...city });
    }
}
