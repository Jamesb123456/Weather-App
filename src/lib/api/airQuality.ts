import { AIR_QUALITY_API_URL, AIR_QUALITY_PARAMS } from '../constants';
import type { AirQualityResponse, AirQualityData } from './types';

export async function fetchAirQuality(
  latitude: number,
  longitude: number,
  timezone = 'auto'
): Promise<AirQualityResponse> {
  const params = new URLSearchParams({
    latitude: latitude.toString(),
    longitude: longitude.toString(),
    timezone,
    current: AIR_QUALITY_PARAMS.current.join(','),
  });

  const response = await fetch(`${AIR_QUALITY_API_URL}/air-quality?${params}`);
  
  if (!response.ok) {
    throw new Error(`Air Quality API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

export function parseAirQualityResponse(response: AirQualityResponse): AirQualityData | null {
  if (!response.current) {
    return null;
  }

  return {
    aqi: response.current.us_aqi,
    pm10: response.current.pm10,
    pm2_5: response.current.pm2_5,
    carbonMonoxide: response.current.carbon_monoxide,
    nitrogenDioxide: response.current.nitrogen_dioxide,
    sulphurDioxide: response.current.sulphur_dioxide,
    ozone: response.current.ozone,
    lastUpdated: new Date(),
  };
}

export async function getAirQualityData(
  latitude: number,
  longitude: number
): Promise<AirQualityData | null> {
  const response = await fetchAirQuality(latitude, longitude);
  return parseAirQualityResponse(response);
}
