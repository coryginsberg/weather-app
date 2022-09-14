enum PressureTrend {
    RISING = 'rising',
    FALLING = 'falling',
    STEADY = 'steady',
};

interface RequestMetadata {
    attributionURL: string,
    expireTime: string,
    latitude: number,
    longitude: number,
    readTime: string,
    reportedTime: string,
    units: string,
    version: number,
}

export interface CurrentWeather {
    name: string,
    metadata: RequestMetadata,
    asOf: Date,
    cloudCover: number,
    conditionCode: string,
    daylight: boolean,
    humidity: number,
    precipitationIntensity: number,
    pressure: number,
    pressureTrend: PressureTrend,
    temperature: number,
    temperatureApparent: number,
    temperatureDewPoint: number,
    uvIndex: number,
    visibility: number,
    windDirection: number,
    windGust: number,
    windSpeed: number,
}

// https://developer.apple.com/documentation/weatherkitrestapi/dailyforecast
export interface DailyForecast {

}

// https://developer.apple.com/documentation/weatherkitrestapi/daypartforecast
export interface DayPartForecast {

}

// https://developer.apple.com/documentation/weatherkitrestapi/dayweatherconditions
export interface DayWeatherConditions {
    conditionCode: string,
    daytimeForecase: DayPartForecast,
}