import { MapPin, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/settings/ThemeToggle';
import { UnitToggle } from '@/components/settings/UnitToggle';
import { cn } from '@/lib/utils/cn';

interface HeaderProps {
  locationName: string;
  onRefresh: () => void;
  isLoading?: boolean;
  className?: string;
}

export function Header({ locationName, onRefresh, isLoading, className }: HeaderProps) {
  return (
    <header className={cn('w-full', className)}>
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm">
            <MapPin className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white tracking-tight truncate max-w-[200px] sm:max-w-none">
              {locationName || 'SkyPulse'}
            </h1>
            <p className="text-xs text-white/70">Real-time weather</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="glass"
            size="icon"
            onClick={onRefresh}
            disabled={isLoading}
            aria-label="Refresh weather data"
            className="group"
          >
            <RefreshCw
              className={cn(
                'w-4 h-4 transition-transform duration-300',
                isLoading && 'animate-spin',
                'group-hover:rotate-180'
              )}
            />
          </Button>
          <UnitToggle />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
