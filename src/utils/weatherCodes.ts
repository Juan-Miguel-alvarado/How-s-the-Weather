export interface WeatherInfo {
  label: string;
  iconName: string;
  isDay?: boolean;
}

export const weatherCodeMap: Record<number, WeatherInfo> = {
  0: { label: 'Clear sky', iconName: 'sun' },
  1: { label: 'Mainly clear', iconName: 'sun' },
  2: { label: 'Partly cloudy', iconName: 'cloud' },
  3: { label: 'Overcast', iconName: 'cloud-filled' },
  45: { label: 'Foggy', iconName: 'mist' },
  48: { label: 'Icy fog', iconName: 'mist' },
  51: { label: 'Light drizzle', iconName: 'cloud-drizzle' },
  53: { label: 'Drizzle', iconName: 'cloud-drizzle' },
  55: { label: 'Heavy drizzle', iconName: 'cloud-drizzle' },
  56: { label: 'Freezing drizzle', iconName: 'cloud-snow' },
  57: { label: 'Heavy freezing drizzle', iconName: 'cloud-snow' },
  61: { label: 'Light rain', iconName: 'cloud-rain' },
  63: { label: 'Rain', iconName: 'cloud-rain' },
  65: { label: 'Heavy rain', iconName: 'cloud-rain' },
  66: { label: 'Freezing rain', iconName: 'cloud-snow' },
  67: { label: 'Heavy freezing rain', iconName: 'cloud-snow' },
  71: { label: 'Light snow', iconName: 'snowflake' },
  73: { label: 'Snow', iconName: 'snowflake' },
  75: { label: 'Heavy snow', iconName: 'snowflake' },
  77: { label: 'Snow grains', iconName: 'snowflake' },
  80: { label: 'Light showers', iconName: 'cloud-rain' },
  81: { label: 'Showers', iconName: 'cloud-rain' },
  82: { label: 'Heavy showers', iconName: 'cloud-storm' },
  85: { label: 'Snow showers', iconName: 'cloud-snow' },
  86: { label: 'Heavy snow showers', iconName: 'cloud-snow' },
  95: { label: 'Thunderstorm', iconName: 'cloud-storm' },
  96: { label: 'Thunderstorm with hail', iconName: 'cloud-storm' },
  99: { label: 'Thunderstorm with heavy hail', iconName: 'cloud-storm' },
};

export function getWeatherInfo(code: number, isDay = 1): WeatherInfo {
  const info = weatherCodeMap[code] ?? { label: 'Unknown', iconName: 'question-mark' };
  if ((code === 0 || code === 1) && isDay === 0) {
    return { ...info, iconName: 'moon', label: 'Clear night' };
  }
  if (code === 2 && isDay === 0) {
    return { ...info, iconName: 'cloud-moon', label: 'Partly cloudy night' };
  }
  return info;
}

export function getWindDirection(degrees: number): string {
  const dirs = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  return dirs[Math.round(degrees / 45) % 8];
}

export function getUVLabel(uv: number): string {
  if (uv < 3) return 'Low';
  if (uv < 6) return 'Moderate';
  if (uv < 8) return 'High';
  if (uv < 11) return 'Very High';
  return 'Extreme';
}

export function formatTemp(temp: number): string {
  return `${Math.round(temp)}°`;
}

export function formatTime(isoTime: string): string {
  const date = new Date(isoTime);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export function formatHour(isoTime: string): string {
  const date = new Date(isoTime);
  const h = date.getHours();
  if (h === 0) return '12 AM';
  if (h < 12) return `${h} AM`;
  if (h === 12) return '12 PM';
  return `${h - 12} PM`;
}
