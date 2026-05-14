import type { WeatherResponse } from '../types/weather';

const BASE_URL = 'https://api.open-meteo.com/v1';

export async function fetchWeather(lat: number, lon: number): Promise<WeatherResponse> {
  const params = new URLSearchParams({
    latitude: String(lat),
    longitude: String(lon),
    current: [
      'temperature_2m',
      'apparent_temperature',
      'relative_humidity_2m',
      'wind_speed_10m',
      'wind_direction_10m',
      'precipitation',
      'uv_index',
      'weather_code',
      'is_day',
    ].join(','),
    hourly: [
      'temperature_2m',
      'apparent_temperature',
      'precipitation_probability',
      'wind_speed_10m',
      'relative_humidity_2m',
      'weather_code',
      'uv_index',
    ].join(','),
    daily: [
      'temperature_2m_max',
      'temperature_2m_min',
      'precipitation_sum',
      'precipitation_probability_max',
      'wind_speed_10m_max',
      'uv_index_max',
      'weather_code',
      'sunrise',
      'sunset',
    ].join(','),
    wind_speed_unit: 'kmh',
    timezone: 'auto',
    forecast_days: '7',
  });

  const res = await fetch(`${BASE_URL}/forecast?${params}`);
  if (!res.ok) throw new Error('Failed to fetch weather data');
  return res.json() as Promise<WeatherResponse>;
}
