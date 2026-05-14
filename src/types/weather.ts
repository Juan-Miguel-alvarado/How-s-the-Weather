export interface GeocodingResult {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  country: string;
  country_code: string;
  admin1?: string;
  admin2?: string;
  timezone: string;
  population?: number;
}

export interface GeocodingResponse {
  results?: GeocodingResult[];
}

export interface CurrentWeatherData {
  time: string;
  temperature_2m: number;
  apparent_temperature: number;
  relative_humidity_2m: number;
  wind_speed_10m: number;
  wind_direction_10m: number;
  precipitation: number;
  uv_index: number;
  weather_code: number;
  is_day: number;
}

export interface DailyWeatherData {
  time: string[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  precipitation_sum: number[];
  precipitation_probability_max: number[];
  wind_speed_10m_max: number[];
  uv_index_max: number[];
  weather_code: number[];
  sunrise: string[];
  sunset: string[];
}

export interface HourlyWeatherData {
  time: string[];
  temperature_2m: number[];
  precipitation_probability: number[];
  wind_speed_10m: number[];
  relative_humidity_2m: number[];
  weather_code: number[];
  uv_index: number[];
  apparent_temperature: number[];
}

export interface WeatherResponse {
  latitude: number;
  longitude: number;
  timezone: string;
  timezone_abbreviation: string;
  current: CurrentWeatherData;
  daily: DailyWeatherData;
  hourly: HourlyWeatherData;
}

export interface ProcessedHourlyData {
  time: string;
  hour: string;
  temperature: number;
  feelsLike: number;
  precipitationProbability: number;
  windSpeed: number;
  humidity: number;
  weatherCode: number;
  uvIndex: number;
}

export interface ProcessedDailyData {
  date: string;
  dayName: string;
  shortDay: string;
  tempMax: number;
  tempMin: number;
  precipitationSum: number;
  precipitationProbability: number;
  windSpeedMax: number;
  uvIndexMax: number;
  weatherCode: number;
  sunrise: string;
  sunset: string;
}

export interface WeatherState {
  location: GeocodingResult | null;
  weather: WeatherResponse | null;
  isLoading: boolean;
  error: string | null;
}
