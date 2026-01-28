import {
  Droplets,
  Wind,
  Eye,
  Gauge,
  Sun,
  Thermometer,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useSettings } from '@/context/SettingsContext';
import {
  formatHumidity,
  formatWindSpeed,
  formatVisibility,
  formatPressure,
  formatUVIndex,
  formatTemperature,
} from '@/lib/utils/formatters';
import { cn } from '@/lib/utils/cn';
import type { CurrentWeather } from '@/lib/api/types';

interface WeatherDetailsProps {
  weather: CurrentWeather;
  className?: string;
}

interface DetailItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  subValue?: string;
  colorClass?: string;
}

function DetailItem({ icon, label, value, subValue, colorClass }: DetailItemProps) {
  return (
    <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors text-center min-h-[100px]">
      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 mb-2">
        {icon}
      </div>
      <p className="text-[10px] text-white/60 uppercase tracking-wide mb-1">{label}</p>
      <p className={cn('text-base font-bold', colorClass || 'text-white')}>
        {value}
      </p>
      {subValue && <p className="text-[10px] text-white/50 mt-0.5">{subValue}</p>}
    </div>
  );
}

export function WeatherDetails({ weather, className }: WeatherDetailsProps) {
  const { unit } = useSettings();
  const uvInfo = formatUVIndex(weather.uv_index);

  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold">Weather Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
          <DetailItem
            icon={<Thermometer className="w-4 h-4 text-orange-400" />}
            label="Feels Like"
            value={formatTemperature(weather.apparent_temperature, unit)}
          />
          <DetailItem
            icon={<Droplets className="w-4 h-4 text-sky-400" />}
            label="Humidity"
            value={formatHumidity(weather.relative_humidity_2m)}
          />
          <DetailItem
            icon={<Wind className="w-4 h-4 text-teal-400" />}
            label="Wind"
            value={formatWindSpeed(weather.wind_speed_10m, unit)}
            subValue={`Gusts ${formatWindSpeed(weather.wind_gusts_10m, unit)}`}
          />
          <DetailItem
            icon={<Eye className="w-4 h-4 text-purple-400" />}
            label="Visibility"
            value={formatVisibility(weather.visibility)}
          />
          <DetailItem
            icon={<Gauge className="w-4 h-4 text-indigo-400" />}
            label="Pressure"
            value={formatPressure(weather.pressure_msl)}
          />
          <DetailItem
            icon={<Sun className="w-4 h-4 text-yellow-400" />}
            label="UV Index"
            value={uvInfo.value}
            subValue={uvInfo.level}
            colorClass={uvInfo.color}
          />
        </div>
      </CardContent>
    </Card>
  );
}
