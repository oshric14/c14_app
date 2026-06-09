export type WeatherType = {
  degrees: number;
  description: string;
  date: string;
  day: string;
  city: string;
  country: string;
  clouds: number;
  humidity: number;
  wind: number;
  uvi: number;
  icon: string;
};

export type WeatherResType = {
  weather: { id: number; description: string; icon: string }[];
  dt: number;
  humidity: number;
  clouds: number;
  wind_speed: number;
  uvi: number;
  temp: { day: number };
};

export type CoordinateType = { lat: number; lon: number };

export type CloseDaysType = WeatherType & { originalIndex: number };


// New types for Google-style weather
// Note: weather is an array in OpenWeatherMap API
export type CurrentWeatherType = {
  temp: number;
  feels_like: number;
  humidity: number;
  wind_speed: number;
  clouds: number;
  uvi: number;
  rain?: {
    "1h"?: number;
  };
  weather: Array<{
    id: number;
    description: string;
    icon: string;
  }>;
  dt: number;
};

export type HourlyWeatherType = {
  dt: number;
  temp: number;
  weather: Array<{
    id: number;
    description: string;
    icon: string;
  }>;
  pop: number; // precipitation probability
  humidity: number;
  wind_speed: number;
  rain?: {
    "1h"?: number;
  };
};

export type DailyWeatherType = {
  dt: number;
  temp: {
    min: number;
    max: number;
    day: number;
  };
  feels_like?: {
    day?: number;
    night?: number;
    eve?: number;
    morn?: number;
  };
  weather: Array<{
    id: number;
    description: string;
    icon: string;
  }>;
  pop: number; // precipitation probability
  humidity: number;
  wind_speed: number;
  clouds: number;
  uvi: number;
};

export type WeatherDataType = {
  current: CurrentWeatherType;
  hourly: HourlyWeatherType[];
  daily: DailyWeatherType[];
  city: string;
  country: string;
  timezone: string;
  timezone_offset: number;
};

export type CityTemperatureType = {
  cityHebrew: string;
  cityEnglish: string;
  tempMax: number;
  tempMin: number;
};
