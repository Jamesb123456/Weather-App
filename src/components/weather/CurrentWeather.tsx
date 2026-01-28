import { Star, StarOff } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { WeatherIcon } from './WeatherIcon';
import { useSettings } from '@/context/SettingsContext';
import { useFavorites } from '@/hooks/useFavorites';
import { formatTemperature, formatTemperatureValue } from '@/lib/utils/formatters';
import { getWeatherDescription } from '@/lib/utils/weatherCodes';
import { cn } from '@/lib/utils/cn';
import type { CurrentWeather as CurrentWeatherType, Location } from '@/lib/api/types';

interface CurrentWeatherProps {
  weather: CurrentWeatherType;
  location: Location;
  className?: string;
}

export function CurrentWeather({ weather, location, className }: CurrentWeatherProps) {
  const { unit } = useSettings();
  const { isFavorite, toggleFavorite } = useFavorites();
  const isNight = weather.is_day === 0;
  const isFav = isFavorite(location);

  return (
    <Card className={cn('relative overflow-hidden', className)}>
      <CardContent className="p-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-4">
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
            <div className="flex items-center gap-2 mb-2">
              <h2 className="text-lg font-medium text-white/80">
                {location.name}
                {location.admin1 && `, ${location.admin1}`}
              </h2>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => toggleFavorite(location)}
                aria-label={isFav ? 'Remove from favorites' : 'Add to favorites'}
              >
                {isFav ? (
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ) : (
                  <StarOff className="w-4 h-4 text-white/60 hover:text-white" />
                )}
              </Button>
            </div>

            <div className="flex items-center gap-4">
              <WeatherIcon code={weather.weather_code} isNight={isNight} size="xl" />
              <div>
                <div className="text-6xl sm:text-7xl font-bold text-white font-mono tracking-tighter">
                  {formatTemperatureValue(weather.temperature_2m, unit)}°
                </div>
                <p className="text-lg text-white/80 mt-1">
                  {getWeatherDescription(weather.weather_code)}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 mt-4 text-sm text-white/70">
              <span>
                Feels like{' '}
                <span className="font-mono font-medium text-white">
                  {formatTemperature(weather.apparent_temperature, unit)}
                </span>
              </span>
              <span className="w-px h-4 bg-white/30" />
              <span>
                High{' '}
                <span className="font-mono font-medium text-white">
                  {formatTemperatureValue(weather.temperature_2m + 3, unit)}°
                </span>
              </span>
              <span className="w-px h-4 bg-white/30" />
              <span>
                Low{' '}
                <span className="font-mono font-medium text-white">
                  {formatTemperatureValue(weather.temperature_2m - 5, unit)}°
                </span>
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
