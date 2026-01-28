import { getTimeOfDay } from './formatters';

export type TimeOfDay = 'dawn' | 'day' | 'dusk' | 'night';
export type WeatherCondition = 'clear' | 'cloudy' | 'rainy' | 'snowy' | 'stormy' | 'foggy';

interface GradientConfig {
  background: string;
  card: {
    light: string;
    dark: string;
  };
}

const timeGradients: Record<TimeOfDay, GradientConfig> = {
  dawn: {
    background: 'from-orange-300 via-pink-300 to-purple-400',
    card: {
      light: 'bg-white/20 backdrop-blur-xl border-white/30',
      dark: 'bg-black/20 backdrop-blur-xl border-white/10',
    },
  },
  day: {
    background: 'from-sky-400 via-blue-500 to-indigo-500',
    card: {
      light: 'bg-white/20 backdrop-blur-xl border-white/30',
      dark: 'bg-black/20 backdrop-blur-xl border-white/10',
    },
  },
  dusk: {
    background: 'from-orange-400 via-rose-500 to-purple-600',
    card: {
      light: 'bg-white/20 backdrop-blur-xl border-white/30',
      dark: 'bg-black/20 backdrop-blur-xl border-white/10',
    },
  },
  night: {
    background: 'from-slate-900 via-purple-900 to-indigo-950',
    card: {
      light: 'bg-white/10 backdrop-blur-xl border-white/20',
      dark: 'bg-black/30 backdrop-blur-xl border-white/10',
    },
  },
};

const weatherOverlays: Record<WeatherCondition, string> = {
  clear: '',
  cloudy: 'bg-gradient-to-b from-gray-400/20 to-transparent',
  rainy: 'bg-gradient-to-b from-gray-600/30 to-gray-400/20',
  snowy: 'bg-gradient-to-b from-gray-200/30 to-white/10',
  stormy: 'bg-gradient-to-b from-gray-800/40 to-gray-600/30',
  foggy: 'bg-gradient-to-b from-gray-400/40 to-gray-300/30',
};

export function getBackgroundGradient(timeOfDay?: TimeOfDay): string {
  const time = timeOfDay || getTimeOfDay();
  return `bg-gradient-to-br ${timeGradients[time].background}`;
}

export function getCardStyles(isDark: boolean, timeOfDay?: TimeOfDay): string {
  const time = timeOfDay || getTimeOfDay();
  const config = timeGradients[time].card;
  return isDark ? config.dark : config.light;
}

export function getWeatherOverlay(condition: WeatherCondition): string {
  return weatherOverlays[condition];
}

export function getGlassCard(isDark: boolean): string {
  if (isDark) {
    return 'bg-black/20 backdrop-blur-xl border border-white/10';
  }
  return 'bg-white/20 backdrop-blur-xl border border-white/30';
}

export function getGlassCardHover(isDark: boolean): string {
  if (isDark) {
    return 'hover:bg-black/30 hover:border-white/20';
  }
  return 'hover:bg-white/30 hover:border-white/40';
}

export function getTextColors(isDark: boolean): {
  primary: string;
  secondary: string;
  muted: string;
} {
  if (isDark) {
    return {
      primary: 'text-white',
      secondary: 'text-white/90',
      muted: 'text-white/60',
    };
  }
  return {
    primary: 'text-white',
    secondary: 'text-white/90',
    muted: 'text-white/70',
  };
}

export function getTimeBasedGradient(isDay: boolean): string {
  const hour = new Date().getHours();
  let timeOfDay: TimeOfDay = 'day';
  
  if (hour >= 5 && hour < 7) {
    timeOfDay = 'dawn';
  } else if (hour >= 7 && hour < 17) {
    timeOfDay = isDay ? 'day' : 'night';
  } else if (hour >= 17 && hour < 20) {
    timeOfDay = 'dusk';
  } else {
    timeOfDay = 'night';
  }
  
  return getBackgroundGradient(timeOfDay);
}

export function getAQIColor(aqi: number): {
  bg: string;
  text: string;
  label: string;
} {
  if (aqi <= 50) {
    return { bg: 'bg-green-500', text: 'text-green-500', label: 'Good' };
  }
  if (aqi <= 100) {
    return { bg: 'bg-yellow-500', text: 'text-yellow-500', label: 'Moderate' };
  }
  if (aqi <= 150) {
    return { bg: 'bg-orange-500', text: 'text-orange-500', label: 'Unhealthy for Sensitive Groups' };
  }
  if (aqi <= 200) {
    return { bg: 'bg-red-500', text: 'text-red-500', label: 'Unhealthy' };
  }
  if (aqi <= 300) {
    return { bg: 'bg-purple-500', text: 'text-purple-500', label: 'Very Unhealthy' };
  }
  return { bg: 'bg-rose-900', text: 'text-rose-900', label: 'Hazardous' };
}
