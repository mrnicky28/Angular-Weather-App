import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { CityData, DataToday, Geoposition, OneWeather, Place } from 'src/app/model/weather';
import { environment } from 'src/environments/environment';

import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class ForecastService {
    weatherData: OneWeather;
    selectedCities: Place[] = [];
    cityUpdatedSub = new Subject<Place[]>();
    subject = new Subject<any>();
    citySub = new Subject<Place>();

    private messageData = new BehaviorSubject<CityData[]>([]);
    currentData = this.messageData.asObservable();
    lat = null;
    lon = null;
    dataCity = new Subject<DataToday>();

    constructor(private http: HttpClient) {}

    changeData(data: CityData[]) {
        console.log(this.currentData);

        this.messageData.next(data);
    }

    getWeatherForecast() {
        return new Observable((observer) => {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    observer.next(position);
                },
                (error) => {
                    alert('Geolocation is blocked in this browser.');
                },
            );
        }).pipe(
            map((value: Geoposition) => {
                return new HttpParams()
                    .set('lon', value.coords.longitude)
                    .set('lat', value.coords.latitude)
                    .set('units', `${environment.units}`)
                    .set('appid', `${environment.API_KEY}`);
            }),
            switchMap((values) => {
                return this.http.get(`${environment.weatherUrl}`, {
                    params: values,
                });
            }),
        );
    }

    getWeatherByCityName(cityData) {
        return this.http.get<DataToday>(
            `${environment.weatherUrl}?lat=${cityData[0]?.lat}&lon=${cityData[0]?.lon}&units=${environment.units}&appid=${environment.API_KEY}`,
        );
        // .subscribe((data) => {
        //     this.dataCity.next(data);
        //     console.log(this.dataCity);
        // });
    }

    dispatchWeatherData(): void {
        this.subject.next({ ...this.weatherData });
    }

    addCity(city: Place) {
        if (this.cityAlreadyAdded(city) === -1) {
            this.selectedCities.unshift(city);
            this.dispatchCities();
            this.setCities();
        }
    }

    cityAlreadyAdded(city: Place): number {
        let index = -1;
        this.selectedCities.forEach((x, i) => {
            if (x.name === city.name) {
                index = i;
            }
        });
        return index;
    }

    removeCity(city: Place) {
        const index = this.cityAlreadyAdded(city);
        if (index > -1) {
            this.selectedCities.splice(index, 1);
            this.dispatchCities();
            this.setCities();
        }
    }

    getCities(): void {
        const cities: any = JSON.stringify(localStorage.getItem('cities'));
        this.selectedCities = cities ? cities : [];
        this.dispatchCities();
    }

    setCities() {
        localStorage.setItem('cities', JSON.stringify(this.selectedCities));
    }

    dispatchCities() {
        this.cityUpdatedSub.next(this.selectedCities);
    }

    setDefault(name: string, lat: number, lon: number): boolean {
        const val = { name, lat, lon };
        localStorage.setItem('default', JSON.stringify(val));
        return true;
    }

    getDefaultCity(): Place {
        return JSON.parse(localStorage.getItem('default'));
    }
}
