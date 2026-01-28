export const API_BASE_URL = 'https://api.open-meteo.com/v1';
export const GEOCODING_API_URL = 'https://geocoding-api.open-meteo.com/v1';
export const AIR_QUALITY_API_URL = 'https://air-quality-api.open-meteo.com/v1';
export const RAINVIEWER_API_URL = 'https://api.rainviewer.com/public/weather-maps.json';

export const DEFAULT_LOCATION = {
  name: 'New York',
  latitude: 40.7128,
  longitude: -74.006,
  country: 'United States',
  admin1: 'New York',
};

export const WEATHER_PARAMS = {
  current: [
    'temperature_2m',
    'relative_humidity_2m',
    'apparent_temperature',
    'is_day',
    'precipitation',
    'rain',
    'showers',
    'snowfall',
    'weather_code',
    'cloud_cover',
    'pressure_msl',
    'surface_pressure',
    'wind_speed_10m',
    'wind_direction_10m',
    'wind_gusts_10m',
    'uv_index',
    'visibility',
  ],
  hourly: [
    'temperature_2m',
    'relative_humidity_2m',
    'apparent_temperature',
    'precipitation_probability',
    'precipitation',
    'weather_code',
    'wind_speed_10m',
    'uv_index',
    'is_day',
  ],
  daily: [
    'weather_code',
    'temperature_2m_max',
    'temperature_2m_min',
    'apparent_temperature_max',
    'apparent_temperature_min',
    'sunrise',
    'sunset',
    'uv_index_max',
    'precipitation_sum',
    'precipitation_probability_max',
    'wind_speed_10m_max',
  ],
};

export const AIR_QUALITY_PARAMS = {
  current: [
    'us_aqi',
    'pm10',
    'pm2_5',
    'carbon_monoxide',
    'nitrogen_dioxide',
    'sulphur_dioxide',
    'ozone',
  ],
};

export const STORAGE_KEYS = {
  theme: 'skypulse-theme',
  unit: 'skypulse-unit',
  favorites: 'skypulse-favorites',
  lastLocation: 'skypulse-last-location',
};

export const KEYBOARD_SHORTCUTS = {
  search: '/',
  close: 'Escape',
  toggleTheme: 't',
  toggleUnit: 'u',
  toggleFavorite: 'f',
  refresh: 'r',
};

export const CACHE_DURATION = {
  weather: 5 * 60 * 1000,
  geocoding: 24 * 60 * 60 * 1000,
  airQuality: 30 * 60 * 1000,
};

export const MAP_CONFIG = {
  defaultZoom: 8,
  minZoom: 3,
  maxZoom: 12,
  tileLayer: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
};
