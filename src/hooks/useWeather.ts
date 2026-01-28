import { useState, useEffect, useCallback } from 'react';
import type { WeatherData, AirQualityData } from '@/lib/api/types';
import { getWeatherData } from '@/lib/api/weather';
import { getAirQualityData } from '@/lib/api/airQuality';

interface UseWeatherReturn {
  weather: WeatherData | null;
  airQuality: AirQualityData | null;
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export function useWeather(latitude: number, longitude: number): UseWeatherReturn {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [airQuality, setAirQuality] = useState<AirQualityData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    if (latitude === 0 && longitude === 0) return;

    setIsLoading(true);
    setError(null);

    try {
      const location = { name: '', latitude, longitude };
      const [weatherData, aqData] = await Promise.all([
        getWeatherData(location),
        getAirQualityData(latitude, longitude),
      ]);

      setWeather(weatherData);
      setAirQuality(aqData);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch weather data'));
    } finally {
      setIsLoading(false);
    }
  }, [latitude, longitude]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const refetch = useCallback(async () => {
    await fetchData();
  }, [fetchData]);

  return {
    weather,
    airQuality,
    isLoading,
    error,
    refetch,
  };
}
