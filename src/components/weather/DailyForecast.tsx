import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { WeatherIcon } from './WeatherIcon';
import { useSettings } from '@/context/SettingsContext';
import { formatTemperatureValue, formatDayOfWeek } from '@/lib/utils/formatters';
import { getWeatherDescription } from '@/lib/utils/weatherCodes';
import { cn } from '@/lib/utils/cn';
import type { DailyForecastItem } from '@/lib/api/types';

interface DailyForecastProps {
  daily: DailyForecastItem[];
  className?: string;
}

export function DailyForecast({ daily, className }: DailyForecastProps) {
  const { unit } = useSettings();

  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold">7-Day Forecast</CardTitle>
      </CardHeader>
      <CardContent className="p-0 pb-2">
        <div className="divide-y divide-white/10">
          {daily.map((day) => (
            <div
              key={day.date}
              className={cn(
                'flex items-center justify-between px-6 py-3 transition-colors duration-200',
                'hover:bg-white/5'
              )}
            >
              <div className="flex items-center gap-4 min-w-[120px]">
                <span className="text-sm font-medium text-white w-16">
                  {formatDayOfWeek(day.date)}
                </span>
                <WeatherIcon code={day.weatherCode} size="sm" />
              </div>

              <div className="flex-1 hidden sm:block">
                <span className="text-sm text-white/70">
                  {getWeatherDescription(day.weatherCode)}
                </span>
              </div>

              {day.precipitationProbability > 0 && (
                <div className="flex items-center gap-1 text-sky-300 mr-4">
                  <span className="text-xs font-medium">
                    {day.precipitationProbability}%
                  </span>
                </div>
              )}

              <div className="flex items-center gap-3 font-mono text-sm">
                <span className="text-white font-semibold w-10 text-right">
                  {formatTemperatureValue(day.tempMax, unit)}°
                </span>
                <div className="w-20 h-1.5 rounded-full bg-white/20 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-sky-400 to-orange-400"
                    style={{
                      width: `${((day.tempMax - day.tempMin) / 30) * 100}%`,
                      marginLeft: `${((day.tempMin + 10) / 40) * 100}%`,
                    }}
                  />
                </div>
                <span className="text-white/60 w-10 text-right">
                  {formatTemperatureValue(day.tempMin, unit)}°
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
