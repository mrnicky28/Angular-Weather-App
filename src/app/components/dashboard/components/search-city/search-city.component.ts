import { CityData, Place } from 'src/app/model/weather';
import { ForecastService } from 'src/app/shared/services/forecast.service';

import {
    AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild
} from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'app-search-city',
    templateUrl: './search-city.component.html',
    styleUrls: ['./search-city.component.scss'],
})
export class SearchCityComponent implements AfterViewInit, OnInit {
    latlongs: CityData[];
    autocompleteInput: string | undefined;
    searchValue = new FormControl();
    @ViewChild('addresstext') addresstext;
    @Output() thisEvent = new EventEmitter();
    @Input() adressType: string | undefined;
    @Input() type: string | undefined;

    constructor(public forecastService: ForecastService) {}

    ngOnInit(): void {
        // this.searchValue.valueChanges.pipe(debounceTime(500)).subscribe((value) => {
        // });
    }
    newData(): void {
        this.forecastService.changeData(this.latlongs);
        this.searchValue.reset();
    }

    ngAfterViewInit(): void {
        this.getPlaceAutocomplete();
    }

    private getPlaceAutocomplete(): void {
        const autocomplete = new google.maps.places.Autocomplete(
            this.addresstext.nativeElement,
            {
                types: [this.adressType],
            },
        );
        google.maps.event.addListener(autocomplete, 'place_changed', () => {
            const place = autocomplete.getPlace();
            this.addresstext.nativeElement.focus();
            this.codeAddress(place);
        });
    }
    codeAddress(place: CityData): void {
        const geocoder = new google.maps.Geocoder();
        const address = place.name;
        geocoder.geocode({ address }, (results, status): void => {
            if (status === google.maps.GeocoderStatus.OK) {
                const lat = results[0].geometry.location.lat();
                const lon = results[0].geometry.location.lng();
                const targetPlace: Place = {
                    name: address,
                    lat,
                    lon,
                };
                this.latlongs = [];
                this.latlongs.push(targetPlace);
            } else {
                console.log(
                    'Geocode was not successful for the following reason: ' + status,
                );
            }
        });
    }
}
