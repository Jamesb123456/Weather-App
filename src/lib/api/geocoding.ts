import { GEOCODING_API_URL } from '../constants';
import type { GeocodingResponse, GeocodingResult, Location } from './types';

export async function searchCities(query: string, count = 5): Promise<GeocodingResult[]> {
  if (!query || query.trim().length < 2) {
    return [];
  }

  const params = new URLSearchParams({
    name: query.trim(),
    count: count.toString(),
    language: 'en',
    format: 'json',
  });

  const response = await fetch(`${GEOCODING_API_URL}/search?${params}`);
  
  if (!response.ok) {
    throw new Error(`Geocoding API error: ${response.status} ${response.statusText}`);
  }

  const data: GeocodingResponse = await response.json();
  return data.results || [];
}

export function geocodingResultToLocation(result: GeocodingResult): Location {
  return {
    name: result.name,
    latitude: result.latitude,
    longitude: result.longitude,
    country: result.country,
    admin1: result.admin1,
    timezone: result.timezone,
  };
}

export function formatLocationName(location: Location | GeocodingResult): string {
  const parts = [location.name];
  
  if ('admin1' in location && location.admin1 && location.admin1 !== location.name) {
    parts.push(location.admin1);
  }
  
  if (location.country) {
    parts.push(location.country);
  }
  
  return parts.join(', ');
}

export function getLocationId(location: Location | GeocodingResult): string {
  return `${location.latitude.toFixed(4)}_${location.longitude.toFixed(4)}`;
}
