export interface GeocodingResult {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  elevation?: number;
  feature_code?: string;
  country_code?: string;
  admin1_id?: number;
  admin2_id?: number;
  admin3_id?: number;
  admin4_id?: number;
  timezone?: string;
  population?: number;
  postcodes?: string[];
  country?: string;
  country_id?: number;
  admin1?: string;
  admin2?: string;
  admin3?: string;
  admin4?: string;
}

export interface GeocodingResponse {
  results?: GeocodingResult[];
  generationtime_ms?: number;
}

export interface Location {
  name: string;
  latitude: number;
  longitude: number;
  country?: string;
  admin1?: string;
  timezone?: string;
}

export interface CurrentWeather {
  time: string;
  interval: number;
  temperature_2m: number;
  relative_humidity_2m: number;
  apparent_temperature: number;
  is_day: number;
  precipitation: number;
  rain: number;
  showers: number;
  snowfall: number;
  weather_code: number;
  cloud_cover: number;
  pressure_msl: number;
  surface_pressure: number;
  wind_speed_10m: number;
  wind_direction_10m: number;
  wind_gusts_10m: number;
  uv_index: number;
  visibility: number;
}

export interface HourlyWeather {
  time: string[];
  temperature_2m: number[];
  relative_humidity_2m: number[];
  apparent_temperature: number[];
  precipitation_probability: number[];
  precipitation: number[];
  weather_code: number[];
  wind_speed_10m: number[];
  uv_index: number[];
  is_day: number[];
}

export interface DailyWeather {
  time: string[];
  weather_code: number[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  apparent_temperature_max: number[];
  apparent_temperature_min: number[];
  sunrise: string[];
  sunset: string[];
  uv_index_max: number[];
  precipitation_sum: number[];
  precipitation_probability_max: number[];
  wind_speed_10m_max: number[];
}

export interface WeatherResponse {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  current_units?: Record<string, string>;
  current?: CurrentWeather;
  hourly_units?: Record<string, string>;
  hourly?: HourlyWeather;
  daily_units?: Record<string, string>;
  daily?: DailyWeather;
}

export interface CurrentAirQuality {
  time: string;
  interval: number;
  us_aqi: number;
  pm10: number;
  pm2_5: number;
  carbon_monoxide: number;
  nitrogen_dioxide: number;
  sulphur_dioxide: number;
  ozone: number;
}

export interface AirQualityResponse {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  current_units?: Record<string, string>;
  current?: CurrentAirQuality;
}

export interface HourlyForecastItem {
  time: string;
  temperature: number;
  weatherCode: number;
  precipitationProbability: number;
  isDay: boolean;
}

export interface DailyForecastItem {
  date: string;
  weatherCode: number;
  tempMax: number;
  tempMin: number;
  precipitationProbability: number;
  precipitationSum: number;
  sunrise: string;
  sunset: string;
  uvIndexMax: number;
  windSpeedMax: number;
}

export interface WeatherData {
  location: Location;
  current: CurrentWeather;
  hourly: HourlyForecastItem[];
  daily: DailyForecastItem[];
  alerts: WeatherAlert[];
  lastUpdated: Date;
}

export interface AirQualityData {
  aqi: number;
  pm10: number;
  pm2_5: number;
  carbonMonoxide: number;
  nitrogenDioxide: number;
  sulphurDioxide: number;
  ozone: number;
  lastUpdated: Date;
}

export interface WeatherAlert {
  id: string;
  event: string;
  headline: string;
  description: string;
  severity: 'minor' | 'moderate' | 'severe' | 'extreme';
  start: string;
  end: string;
}

export interface FavoriteCity {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  country?: string;
  admin1?: string;
}

export type TemperatureUnit = 'celsius' | 'fahrenheit';
export type ThemeMode = 'light' | 'dark' | 'system';
