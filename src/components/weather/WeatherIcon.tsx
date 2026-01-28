import { getWeatherIcon } from '@/lib/utils/weatherCodes';
import { cn } from '@/lib/utils/cn';

interface WeatherIconProps {
  code: number;
  isNight?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  animated?: boolean;
}

const sizeClasses = {
  sm: 'w-6 h-6',
  md: 'w-10 h-10',
  lg: 'w-16 h-16',
  xl: 'w-24 h-24',
};

export function WeatherIcon({
  code,
  isNight = false,
  size = 'md',
  className,
  animated = true,
}: WeatherIconProps) {
  const Icon = getWeatherIcon(code, isNight);

  return (
    <Icon
      className={cn(
        sizeClasses[size],
        'text-white drop-shadow-lg',
        animated && 'transition-transform duration-300 hover:scale-110',
        className
      )}
    />
  );
}
