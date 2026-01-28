import { useEffect, useCallback } from 'react';
import { Container } from '@/components/layout/Container';
import { Header } from '@/components/layout/Header';
import { SearchBar } from '@/components/search/SearchBar';
import { FavoriteCities } from '@/components/search/FavoriteCities';
import { CurrentWeather } from '@/components/weather/CurrentWeather';
import { HourlyForecast } from '@/components/weather/HourlyForecast';
import { DailyForecast } from '@/components/weather/DailyForecast';
import { WeatherDetails } from '@/components/weather/WeatherDetails';
import { AirQuality } from '@/components/weather/AirQuality';
import { WeatherAlerts } from '@/components/weather/WeatherAlerts';
import { WeatherMap } from '@/components/weather/WeatherMap';
import { ErrorBoundary, FullPageSkeleton } from '@/components/shared';
import { ThemeProvider } from '@/context/ThemeContext';
import { SettingsProvider, useSettings } from '@/context/SettingsContext';
import { useWeather } from '@/hooks/useWeather';
import { useGeolocation } from '@/hooks/useGeolocation';
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';
import { getTimeBasedGradient } from '@/lib/utils/gradients';
import { DEFAULT_LOCATION } from '@/lib/constants';
import type { Location } from '@/lib/api/types';

function WeatherApp() {
  const { currentLocation, setCurrentLocation, toggleUnit } = useSettings();
  const searchInputRef = { current: null as HTMLInputElement | null };

  const location = currentLocation || DEFAULT_LOCATION;
  const { 
    weather, 
    airQuality, 
    isLoading, 
    error, 
    refetch 
  } = useWeather(location.latitude, location.longitude);

  const { 
    getCurrentLocation, 
    isLoading: isGettingLocation 
  } = useGeolocation();

  const handleLocationSelect = useCallback((newLocation: Location) => {
    setCurrentLocation(newLocation);
  }, [setCurrentLocation]);

  const handleGetCurrentLocation = useCallback(async () => {
    const geoLocation = await getCurrentLocation();
    if (geoLocation) {
      setCurrentLocation(geoLocation);
    }
  }, [getCurrentLocation, setCurrentLocation]);

  const handleSearch = useCallback(() => {
    setTimeout(() => {
      searchInputRef.current?.focus();
    }, 100);
  }, []);

  const handleCloseSearch = useCallback(() => {
    // Blur the search input when closing
    searchInputRef.current?.blur();
  }, []);

  useKeyboardShortcuts({
    onSearch: handleSearch,
    onClose: handleCloseSearch,
    onToggleTheme: () => {},
    onToggleUnit: toggleUnit,
    onToggleFavorite: () => {},
    onRefresh: refetch,
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const lat = params.get('lat');
    const lon = params.get('lon');
    const name = params.get('name');

    if (lat && lon && name) {
      setCurrentLocation({
        name,
        latitude: parseFloat(lat),
        longitude: parseFloat(lon),
      });
    }
  }, [setCurrentLocation]);

  const backgroundGradient = weather 
    ? getTimeBasedGradient(weather.current.is_day === 1)
    : 'bg-gradient-to-br from-sky-400 via-blue-500 to-indigo-500';

  if (isLoading && !weather) {
    return (
      <div className={`min-h-screen ${backgroundGradient} transition-all duration-1000`}>
        <FullPageSkeleton />
      </div>
    );
  }

  if (error && !weather) {
    return (
      <div className={`min-h-screen ${backgroundGradient} transition-all duration-1000`}>
        <Container className="py-6">
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold text-white mb-4">Unable to load weather data</h2>
            <p className="text-white/70 mb-6">{error.message}</p>
            <button
              onClick={refetch}
              className="px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full text-white font-medium hover:bg-white/30 transition-colors"
            >
              Try Again
            </button>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${backgroundGradient} transition-all duration-1000`}>
      <Container className="py-6 space-y-6">
        <Header
          locationName={location.name}
          onRefresh={refetch}
          isLoading={isLoading}
        />

        <SearchBar
          onLocationSelect={handleLocationSelect}
          onGetCurrentLocation={handleGetCurrentLocation}
          isGettingLocation={isGettingLocation}
        />

        <FavoriteCities onCitySelect={handleLocationSelect} />

        {weather && (
          <>
            <WeatherAlerts alerts={weather.alerts} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <CurrentWeather
                  weather={weather.current}
                  location={location}
                />
                <HourlyForecast hourly={weather.hourly} />
                <DailyForecast daily={weather.daily} />
                <WeatherMap
                  latitude={location.latitude}
                  longitude={location.longitude}
                />
              </div>

              <div className="space-y-6">
                <WeatherDetails weather={weather.current} />
                {airQuality && <AirQuality data={airQuality} />}
              </div>
            </div>
          </>
        )}

        <footer className="text-center py-8 text-white/50 text-sm">
          <p>
            Powered by{' '}
            <a
              href="https://open-meteo.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 hover:text-white underline transition-colors"
            >
              Open-Meteo
            </a>
          </p>
          <p className="mt-2">
            SkyPulse Weather &copy; {new Date().getFullYear()}
          </p>
        </footer>
      </Container>
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <SettingsProvider>
          <WeatherApp />
        </SettingsProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
