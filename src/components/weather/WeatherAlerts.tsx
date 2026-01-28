import { AlertTriangle, Info, AlertCircle, XCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils/cn';
import type { WeatherAlert } from '@/lib/api/types';

interface WeatherAlertsProps {
  alerts: WeatherAlert[];
  className?: string;
}

const severityConfig = {
  minor: {
    icon: Info,
    bg: 'bg-blue-500/20',
    border: 'border-blue-500/50',
    text: 'text-blue-400',
  },
  moderate: {
    icon: AlertCircle,
    bg: 'bg-yellow-500/20',
    border: 'border-yellow-500/50',
    text: 'text-yellow-400',
  },
  severe: {
    icon: AlertTriangle,
    bg: 'bg-orange-500/20',
    border: 'border-orange-500/50',
    text: 'text-orange-400',
  },
  extreme: {
    icon: XCircle,
    bg: 'bg-red-500/20',
    border: 'border-red-500/50',
    text: 'text-red-400',
  },
};

export function WeatherAlerts({ alerts, className }: WeatherAlertsProps) {
  if (alerts.length === 0) {
    return null;
  }

  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-yellow-400" />
          Weather Alerts
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {alerts.map((alert) => {
            const config = severityConfig[alert.severity];
            const Icon = config.icon;

            return (
              <div
                key={alert.id}
                className={cn(
                  'p-4 rounded-xl border',
                  config.bg,
                  config.border
                )}
              >
                <div className="flex items-start gap-3">
                  <Icon className={cn('w-5 h-5 mt-0.5 flex-shrink-0', config.text)} />
                  <div className="flex-1 min-w-0">
                    <h4 className={cn('font-semibold', config.text)}>
                      {alert.event}
                    </h4>
                    <p className="text-sm text-white/80 mt-1">{alert.headline}</p>
                    <p className="text-xs text-white/60 mt-2">
                      {new Date(alert.start).toLocaleDateString()} -{' '}
                      {new Date(alert.end).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
