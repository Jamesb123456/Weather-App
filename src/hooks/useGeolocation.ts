import { useState, useCallback } from 'react';
import type { Location } from '@/lib/api/types';

interface GeolocationState {
  loading: boolean;
  error: string | null;
  location: { latitude: number; longitude: number } | null;
}

interface UseGeolocationReturn extends GeolocationState {
  getCurrentLocation: () => Promise<Location | null>;
  isLoading: boolean;
  isSupported: boolean;
}

export function useGeolocation(): UseGeolocationReturn {
  const [state, setState] = useState<GeolocationState>({
    loading: false,
    error: null,
    location: null,
  });

  const isSupported = typeof navigator !== 'undefined' && 'geolocation' in navigator;

  const getCurrentLocation = useCallback(async (): Promise<Location | null> => {
    if (!isSupported) {
      setState((prev) => ({
        ...prev,
        error: 'Geolocation is not supported by your browser',
      }));
      return null;
    }

    setState((prev) => ({ ...prev, loading: true, error: null }));

    return new Promise((resolve) => {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setState({
            loading: false,
            error: null,
            location: { latitude, longitude },
          });

          try {
            const location: Location = {
              name: 'Current Location',
              latitude,
              longitude,
            };

            try {
              const reverseGeocode = await fetch(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
              );
              if (reverseGeocode.ok) {
                const data = await reverseGeocode.json();
                location.name = data.address?.city || 
                               data.address?.town || 
                               data.address?.village ||
                               data.address?.municipality ||
                               'Current Location';
                location.country = data.address?.country;
                location.admin1 = data.address?.state || data.address?.region;
              }
            } catch {
              // Use default name if reverse geocoding fails
            }

            resolve(location);
          } catch {
            resolve({
              name: 'Current Location',
              latitude,
              longitude,
            });
          }
        },
        (error) => {
          let errorMessage = 'Unable to get your location';
          
          switch (error.code) {
            case error.PERMISSION_DENIED:
              errorMessage = 'Location access denied. Please enable location permissions.';
              break;
            case error.POSITION_UNAVAILABLE:
              errorMessage = 'Location information is unavailable.';
              break;
            case error.TIMEOUT:
              errorMessage = 'Location request timed out.';
              break;
          }

          setState({
            loading: false,
            error: errorMessage,
            location: null,
          });
          resolve(null);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000,
        }
      );
    });
  }, [isSupported]);

  return {
    ...state,
    getCurrentLocation,
    isLoading: state.loading,
    isSupported,
  };
}
