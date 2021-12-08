export interface OneWeather {
    timezone?: string;
    lat?: number;
    lon?: number;
    added?: boolean;
}

export interface PartialWeather {
    current?: number;
    min_temp?: number;
    max_temp?: number;
}

export interface Place {
    added?: boolean;
    name?: string;
    lat?: number;
    lon?: number;
    temp?: PartialWeather;
}

export interface Weather {
    main: string;
    icon: string;
    description: string;
}

export interface WeatherNow {
    dt: number;
    dt_txt: string;
    main: {
        feels_like: number;
        humidity: number;
        sunrise: number;
        sunset: number;
        temp_min: number;
        temp_max: number;
        temp: number;
    };
    weather: Weather;
    wind: {
        speed: number;
    };
}

export interface DataToday {
    city?: {
        coord: {
            lat: number;
            lon: number;
        };
        name: string;
        country: string;
    };
    list?: [WeatherNow];
}

export interface TimeLine {
    time: string;
    temp: number;
}

export interface CityData {
    name?: string;
    lat?: number;
    lon?: number;
}

export interface Geoposition {
    coords: {
        latitude: number;
        longitude: number;
    };
}
