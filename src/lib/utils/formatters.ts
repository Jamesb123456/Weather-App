export function formatTemperature(temp: number, unit: 'celsius' | 'fahrenheit'): string {
  if (unit === 'fahrenheit') {
    return `${Math.round((temp * 9) / 5 + 32)}°F`;
  }
  return `${Math.round(temp)}°C`;
}

export function formatTemperatureValue(temp: number, unit: 'celsius' | 'fahrenheit'): number {
  if (unit === 'fahrenheit') {
    return Math.round((temp * 9) / 5 + 32);
  }
  return Math.round(temp);
}

export function formatWindSpeed(speed: number, unit: 'celsius' | 'fahrenheit'): string {
  if (unit === 'fahrenheit') {
    return `${Math.round(speed * 0.621371)} mph`;
  }
  return `${Math.round(speed)} km/h`;
}

export function formatVisibility(visibility: number): string {
  if (visibility >= 1000) {
    return `${(visibility / 1000).toFixed(1)} km`;
  }
  return `${Math.round(visibility)} m`;
}

export function formatPressure(pressure: number): string {
  return `${Math.round(pressure)} hPa`;
}

export function formatHumidity(humidity: number): string {
  return `${Math.round(humidity)}%`;
}

export function formatUVIndex(uv: number): { value: string; level: string; color: string } {
  const value = Math.round(uv * 10) / 10;
  let level: string;
  let color: string;

  if (uv <= 2) {
    level = 'Low';
    color = 'text-green-500';
  } else if (uv <= 5) {
    level = 'Moderate';
    color = 'text-yellow-500';
  } else if (uv <= 7) {
    level = 'High';
    color = 'text-orange-500';
  } else if (uv <= 10) {
    level = 'Very High';
    color = 'text-red-500';
  } else {
    level = 'Extreme';
    color = 'text-purple-500';
  }

  return { value: value.toString(), level, color };
}

export function formatDate(date: Date | string, options?: Intl.DateTimeFormatOptions): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-US', options || { weekday: 'short', month: 'short', day: 'numeric' });
}

export function formatTime(date: Date | string, use24Hour = false): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: !use24Hour,
  });
}

export function formatHour(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleTimeString('en-US', {
    hour: 'numeric',
    hour12: true,
  });
}

export function formatDayOfWeek(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  if (d.toDateString() === today.toDateString()) {
    return 'Today';
  }
  if (d.toDateString() === tomorrow.toDateString()) {
    return 'Tomorrow';
  }
  return d.toLocaleDateString('en-US', { weekday: 'short' });
}

export function formatPrecipitation(precipitation: number): string {
  return `${Math.round(precipitation)}%`;
}

export function getRelativeTime(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffMins = Math.floor(diffMs / 60000);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  
  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays}d ago`;
}

export function getCurrentHour(): number {
  return new Date().getHours();
}

export function isNight(hour?: number): boolean {
  const h = hour ?? getCurrentHour();
  return h < 6 || h >= 20;
}

export function getTimeOfDay(hour?: number): 'dawn' | 'day' | 'dusk' | 'night' {
  const h = hour ?? getCurrentHour();
  
  if (h >= 5 && h < 7) return 'dawn';
  if (h >= 7 && h < 17) return 'day';
  if (h >= 17 && h < 20) return 'dusk';
  return 'night';
}
