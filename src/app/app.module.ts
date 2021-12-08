import { GooglePlaceModule } from 'ngx-google-places-autocomplete';

import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
    DashboardWeatherComponent
} from './components/dashboard/components/dashboard-weather/dashboard-weather.component';
import {
    CityCardComponent
} from './components/dashboard/components/favorite-city/city-card/city-card.component';
import {
    FavoriteCityComponent
} from './components/dashboard/components/favorite-city/favorite-city.component';
import {
    SearchCityComponent
} from './components/dashboard/components/search-city/search-city.component';
import {
    WeatherEveryDayComponent
} from './components/dashboard/components/weather-every-day/weather-every-day.component';
import {
    FullInfoOfWeatherComponent
} from './components/today/components/full-info-of-weather/full-info-of-weather.component';
import {
    TodayWeatherComponent
} from './components/today/components/today-weather/today-weather.component';

@NgModule({
    declarations: [
        AppComponent,
        TodayWeatherComponent,
        DashboardWeatherComponent,
        SearchCityComponent,
        FavoriteCityComponent,
        WeatherEveryDayComponent,
        CityCardComponent,
        FullInfoOfWeatherComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        AppRoutingModule,
        HttpClientModule,
        ReactiveFormsModule,
        GooglePlaceModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
