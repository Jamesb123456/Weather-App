import {
  Sun,
  Moon,
  Cloud,
  CloudSun,
  CloudMoon,
  CloudFog,
  CloudDrizzle,
  CloudRain,
  CloudSnow,
  CloudLightning,
  CloudHail,
  Snowflake,
  Wind,
  type LucideIcon,
} from 'lucide-react';

export interface WeatherCodeInfo {
  description: string;
  icon: LucideIcon;
  iconName: string;
  nightIcon?: LucideIcon;
  nightIconName?: string;
  background: 'clear' | 'cloudy' | 'rainy' | 'snowy' | 'stormy' | 'foggy';
}

export const weatherCodeMap: Record<number, WeatherCodeInfo> = {
  0: {
    description: 'Clear sky',
    icon: Sun,
    iconName: 'sun',
    nightIcon: Moon,
    nightIconName: 'moon',
    background: 'clear',
  },
  1: {
    description: 'Mainly clear',
    icon: Sun,
    iconName: 'sun',
    nightIcon: Moon,
    nightIconName: 'moon',
    background: 'clear',
  },
  2: {
    description: 'Partly cloudy',
    icon: CloudSun,
    iconName: 'cloud-sun',
    nightIcon: CloudMoon,
    nightIconName: 'cloud-moon',
    background: 'cloudy',
  },
  3: {
    description: 'Overcast',
    icon: Cloud,
    iconName: 'cloud',
    background: 'cloudy',
  },
  45: {
    description: 'Fog',
    icon: CloudFog,
    iconName: 'cloud-fog',
    background: 'foggy',
  },
  48: {
    description: 'Depositing rime fog',
    icon: CloudFog,
    iconName: 'cloud-fog',
    background: 'foggy',
  },
  51: {
    description: 'Light drizzle',
    icon: CloudDrizzle,
    iconName: 'cloud-drizzle',
    background: 'rainy',
  },
  53: {
    description: 'Moderate drizzle',
    icon: CloudDrizzle,
    iconName: 'cloud-drizzle',
    background: 'rainy',
  },
  55: {
    description: 'Dense drizzle',
    icon: CloudDrizzle,
    iconName: 'cloud-drizzle',
    background: 'rainy',
  },
  56: {
    description: 'Light freezing drizzle',
    icon: CloudDrizzle,
    iconName: 'cloud-drizzle',
    background: 'rainy',
  },
  57: {
    description: 'Dense freezing drizzle',
    icon: CloudDrizzle,
    iconName: 'cloud-drizzle',
    background: 'rainy',
  },
  61: {
    description: 'Slight rain',
    icon: CloudRain,
    iconName: 'cloud-rain',
    background: 'rainy',
  },
  63: {
    description: 'Moderate rain',
    icon: CloudRain,
    iconName: 'cloud-rain',
    background: 'rainy',
  },
  65: {
    description: 'Heavy rain',
    icon: CloudRain,
    iconName: 'cloud-rain',
    background: 'rainy',
  },
  66: {
    description: 'Light freezing rain',
    icon: CloudRain,
    iconName: 'cloud-rain',
    background: 'rainy',
  },
  67: {
    description: 'Heavy freezing rain',
    icon: CloudRain,
    iconName: 'cloud-rain',
    background: 'rainy',
  },
  71: {
    description: 'Slight snow',
    icon: CloudSnow,
    iconName: 'cloud-snow',
    background: 'snowy',
  },
  73: {
    description: 'Moderate snow',
    icon: CloudSnow,
    iconName: 'cloud-snow',
    background: 'snowy',
  },
  75: {
    description: 'Heavy snow',
    icon: CloudSnow,
    iconName: 'cloud-snow',
    background: 'snowy',
  },
  77: {
    description: 'Snow grains',
    icon: Snowflake,
    iconName: 'snowflake',
    background: 'snowy',
  },
  80: {
    description: 'Slight rain showers',
    icon: CloudRain,
    iconName: 'cloud-rain',
    background: 'rainy',
  },
  81: {
    description: 'Moderate rain showers',
    icon: CloudRain,
    iconName: 'cloud-rain',
    background: 'rainy',
  },
  82: {
    description: 'Violent rain showers',
    icon: CloudRain,
    iconName: 'cloud-rain',
    background: 'rainy',
  },
  85: {
    description: 'Slight snow showers',
    icon: CloudSnow,
    iconName: 'cloud-snow',
    background: 'snowy',
  },
  86: {
    description: 'Heavy snow showers',
    icon: CloudSnow,
    iconName: 'cloud-snow',
    background: 'snowy',
  },
  95: {
    description: 'Thunderstorm',
    icon: CloudLightning,
    iconName: 'cloud-lightning',
    background: 'stormy',
  },
  96: {
    description: 'Thunderstorm with slight hail',
    icon: CloudHail,
    iconName: 'cloud-hail',
    background: 'stormy',
  },
  99: {
    description: 'Thunderstorm with heavy hail',
    icon: CloudHail,
    iconName: 'cloud-hail',
    background: 'stormy',
  },
};

export function getWeatherInfo(code: number, isNight = false): WeatherCodeInfo {
  const info = weatherCodeMap[code] || {
    description: 'Unknown',
    icon: Wind,
    iconName: 'wind',
    background: 'clear' as const,
  };

  if (isNight && info.nightIcon) {
    return {
      ...info,
      icon: info.nightIcon,
      iconName: info.nightIconName || info.iconName,
    };
  }

  return info;
}

export function getWeatherDescription(code: number): string {
  return weatherCodeMap[code]?.description || 'Unknown';
}

export function getWeatherIcon(code: number, isNight = false): LucideIcon {
  const info = weatherCodeMap[code];
  if (!info) return Wind;
  
  if (isNight && info.nightIcon) {
    return info.nightIcon;
  }
  
  return info.icon;
}

export function getWeatherBackground(code: number): string {
  return weatherCodeMap[code]?.background || 'clear';
}
