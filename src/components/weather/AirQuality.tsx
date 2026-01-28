import { Wind } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getAQIColor } from '@/lib/utils/gradients';
import { cn } from '@/lib/utils/cn';
import type { AirQualityData } from '@/lib/api/types';

interface AirQualityProps {
  data: AirQualityData;
  className?: string;
}

interface PollutantItemProps {
  label: string;
  value: number;
  unit: string;
}

function PollutantItem({ label, value, unit }: PollutantItemProps) {
  return (
    <div className="flex flex-col items-center p-2 rounded-lg bg-white/5">
      <span className="text-xs text-white/60 uppercase">{label}</span>
      <span className="text-sm font-mono font-semibold text-white">
        {value.toFixed(1)}
      </span>
      <span className="text-xs text-white/40">{unit}</span>
    </div>
  );
}

export function AirQuality({ data, className }: AirQualityProps) {
  const aqiInfo = getAQIColor(data.aqi);
  const percentage = Math.min((data.aqi / 300) * 100, 100);

  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Wind className="w-5 h-5" />
            Air Quality
          </CardTitle>
          <span className={cn('text-sm font-medium px-2 py-1 rounded-full', aqiInfo.bg, 'text-white')}>
            {aqiInfo.label}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-3xl font-bold font-mono text-white">{data.aqi}</span>
            <span className="text-sm text-white/60">US AQI</span>
          </div>
          <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
            <div
              className={cn('h-full rounded-full transition-all duration-500', aqiInfo.bg)}
              style={{ width: `${percentage}%` }}
            />
          </div>
          <div className="flex justify-between mt-1 text-xs text-white/40">
            <span>Good</span>
            <span>Moderate</span>
            <span>Unhealthy</span>
            <span>Hazardous</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <PollutantItem label="PM2.5" value={data.pm2_5} unit="μg/m³" />
          <PollutantItem label="PM10" value={data.pm10} unit="μg/m³" />
          <PollutantItem label="O₃" value={data.ozone} unit="μg/m³" />
        </div>
      </CardContent>
    </Card>
  );
}
