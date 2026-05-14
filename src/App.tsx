import { IconCloud, IconAlertCircle } from '@tabler/icons-react';
import { useWeather } from './hooks/useWeather';
import { useTheme } from './hooks/useTheme';
import { SearchBar } from './components/SearchBar';
import { ThemeToggle } from './components/ThemeToggle';
import { CurrentWeather } from './components/CurrentWeather';
import { ForecastCards } from './components/ForecastCards';
import { HourlyChart } from './components/HourlyChart';
import { WeatherCharts } from './components/WeatherCharts';
import type { ProcessedDailyData, ProcessedHourlyData } from './types/weather';
import { formatHour } from './utils/weatherCodes';
import './styles/global.css';

function processDaily(weather: NonNullable<ReturnType<typeof useWeather>['weather']>): ProcessedDailyData[] {
  return weather.daily.time.map((time, i) => {
    const date = new Date(time);
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const shortDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return {
      date: time,
      dayName: dayNames[date.getDay()],
      shortDay: shortDays[date.getDay()],
      tempMax: weather.daily.temperature_2m_max[i],
      tempMin: weather.daily.temperature_2m_min[i],
      precipitationSum: weather.daily.precipitation_sum[i],
      precipitationProbability: weather.daily.precipitation_probability_max[i],
      windSpeedMax: weather.daily.wind_speed_10m_max[i],
      uvIndexMax: weather.daily.uv_index_max[i],
      weatherCode: weather.daily.weather_code[i],
      sunrise: weather.daily.sunrise[i],
      sunset: weather.daily.sunset[i],
    };
  });
}

function processHourly(weather: NonNullable<ReturnType<typeof useWeather>['weather']>): ProcessedHourlyData[] {
  const now = new Date();
  const todayStr = now.toISOString().slice(0, 10);

  return weather.hourly.time
    .map((time, i) => ({
      time,
      hour: formatHour(time),
      temperature: weather.hourly.temperature_2m[i],
      feelsLike: weather.hourly.apparent_temperature[i],
      precipitationProbability: weather.hourly.precipitation_probability[i],
      windSpeed: weather.hourly.wind_speed_10m[i],
      humidity: weather.hourly.relative_humidity_2m[i],
      weatherCode: weather.hourly.weather_code[i],
      uvIndex: weather.hourly.uv_index[i],
    }))
    .filter(h => h.time.startsWith(todayStr));
}

export default function App() {
  const { theme, toggleTheme } = useTheme();
  const { location, weather, isLoading, error, loadWeather } = useWeather();

  const dailyData = weather ? processDaily(weather) : [];
  const hourlyData = weather ? processHourly(weather) : [];

  return (
    <div className="app">
      <header className="app-header">
        <div className="app-header-left">
          <div className="app-logo">
            <IconCloud size={22} stroke={1.5} />
          </div>
          <span className="app-logo-text">How's the Weather</span>
          <SearchBar onSelect={loadWeather} selectedLocation={location} />
        </div>
        <ThemeToggle theme={theme} onToggle={toggleTheme} />
      </header>

      {error && (
        <div className="error-banner">
          <IconAlertCircle size={16} stroke={1.5} />
          {error}
        </div>
      )}

      {isLoading && (
        <div className="loading-overlay">
          <div className="spinner" />
          <span>Loading weather data…</span>
        </div>
      )}

      {!isLoading && !weather && !error && (
        <div className="empty-state">
          <IconCloud size={64} stroke={1} className="empty-state-icon" />
          <h2>How's the Weather?</h2>
          <p>Search for any city to see current conditions, forecasts, and analytics.</p>
        </div>
      )}

      {weather && location && !isLoading && (
        <div className="app-content">
          <CurrentWeather weather={weather} location={location} today={dailyData[0]} />
          <HourlyChart hours={hourlyData} />
          <ForecastCards days={dailyData} />
          <WeatherCharts days={dailyData} />
        </div>
      )}
    </div>
  );
}
