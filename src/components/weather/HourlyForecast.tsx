import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { WeatherIcon } from './WeatherIcon';
import { useSettings } from '@/context/SettingsContext';
import { formatTemperatureValue, formatHour } from '@/lib/utils/formatters';
import { cn } from '@/lib/utils/cn';
import type { HourlyForecastItem } from '@/lib/api/types';

interface HourlyForecastProps {
  hourly: HourlyForecastItem[];
  className?: string;
}

export function HourlyForecast({ hourly, className }: HourlyForecastProps) {
  const { unit } = useSettings();
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 200;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <Card className={cn('relative', className)}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">24-Hour Forecast</CardTitle>
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => scroll('left')}
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => scroll('right')}
              aria-label="Scroll right"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0 pb-4">
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide px-6 scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {hourly.map((hour, index) => (
            <div
              key={hour.time}
              className={cn(
                'flex flex-col items-center gap-2 py-3 px-4 rounded-xl min-w-[80px] transition-all duration-200',
                index === 0
                  ? 'bg-white/20 border border-white/30'
                  : 'hover:bg-white/10'
              )}
            >
              <span className="text-xs text-white/70 font-medium">
                {index === 0 ? 'Now' : formatHour(hour.time)}
              </span>
              <WeatherIcon
                code={hour.weatherCode}
                isNight={!hour.isDay}
                size="sm"
              />
              <span className="text-sm font-mono font-semibold text-white">
                {formatTemperatureValue(hour.temperature, unit)}°
              </span>
              {hour.precipitationProbability > 0 && (
                <span className="text-xs text-sky-300 font-medium">
                  {hour.precipitationProbability}%
                </span>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
