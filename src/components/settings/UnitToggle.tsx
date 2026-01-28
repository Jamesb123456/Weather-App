import { Button } from '@/components/ui/button';
import { useSettings } from '@/context/SettingsContext';
import { cn } from '@/lib/utils/cn';

export function UnitToggle() {
  const { unit, toggleUnit } = useSettings();

  return (
    <Button
      variant="glass"
      size="sm"
      onClick={toggleUnit}
      aria-label={`Switch to ${unit === 'celsius' ? 'Fahrenheit' : 'Celsius'}`}
      className="font-mono font-semibold min-w-[50px]"
    >
      <span className={cn(unit === 'celsius' ? 'text-white' : 'text-white/50')}>
        °C
      </span>
      <span className="text-white/30 mx-1">/</span>
      <span className={cn(unit === 'fahrenheit' ? 'text-white' : 'text-white/50')}>
        °F
      </span>
    </Button>
  );
}
