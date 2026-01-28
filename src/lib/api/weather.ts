import { API_BASE_URL, WEATHER_PARAMS } from '../constants';
import type { WeatherResponse, WeatherData, HourlyForecastItem, DailyForecastItem, Location } from './types';

export async function fetchWeatherData(
  latitude: number,
  longitude: number,
  timezone = 'auto'
): Promise<WeatherResponse> {
  const params = new URLSearchParams({
    latitude: latitude.toString(),
    longitude: longitude.toString(),
    timezone,
    current: WEATHER_PARAMS.current.join(','),
    hourly: WEATHER_PARAMS.hourly.join(','),
    daily: WEATHER_PARAMS.daily.join(','),
    forecast_days: '7',
  });

  const response = await fetch(`${API_BASE_URL}/forecast?${params}`);
  
  if (!response.ok) {
    throw new Error(`Weather API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

export function parseWeatherResponse(
  response: WeatherResponse,
  location: Location
): WeatherData {
  if (!response.current) {
    throw new Error('No current weather data available');
  }

  const hourly: HourlyForecastItem[] = [];
  const now = new Date();
  const currentHour = now.getHours();

  if (response.hourly) {
    for (let i = 0; i < 24; i++) {
      const hourIndex = currentHour + i;
      if (hourIndex < response.hourly.time.length) {
        hourly.push({
          time: response.hourly.time[hourIndex],
          temperature: response.hourly.temperature_2m[hourIndex],
          weatherCode: response.hourly.weather_code[hourIndex],
          precipitationProbability: response.hourly.precipitation_probability[hourIndex],
          isDay: response.hourly.is_day[hourIndex] === 1,
        });
      }
    }
  }

  const daily: DailyForecastItem[] = [];
  if (response.daily) {
    for (let i = 0; i < response.daily.time.length; i++) {
      daily.push({
        date: response.daily.time[i],
        weatherCode: response.daily.weather_code[i],
        tempMax: response.daily.temperature_2m_max[i],
        tempMin: response.daily.temperature_2m_min[i],
        precipitationProbability: response.daily.precipitation_probability_max[i],
        precipitationSum: response.daily.precipitation_sum[i],
        sunrise: response.daily.sunrise[i],
        sunset: response.daily.sunset[i],
        uvIndexMax: response.daily.uv_index_max[i],
        windSpeedMax: response.daily.wind_speed_10m_max[i],
      });
    }
  }

  return {
    location: {
      ...location,
      timezone: response.timezone,
    },
    current: response.current,
    hourly,
    daily,
    alerts: [],
    lastUpdated: new Date(),
  };
}

export async function getWeatherData(location: Location): Promise<WeatherData> {
  const response = await fetchWeatherData(location.latitude, location.longitude);
  return parseWeatherResponse(response, location);
}
