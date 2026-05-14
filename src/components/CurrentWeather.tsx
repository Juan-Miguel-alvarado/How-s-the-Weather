import {
  IconDroplets, IconWind, IconUvIndex, IconSunrise, IconSunset,
  IconThermometer, IconMapPin,
} from '@tabler/icons-react';
import type { WeatherResponse, GeocodingResult, ProcessedDailyData } from '../types/weather';
import { getWeatherInfo, getWindDirection, getUVLabel, formatTemp, formatTime } from '../utils/weatherCodes';
import { WeatherIcon } from './WeatherIcon';
import './CurrentWeather.css';

interface Props {
  weather: WeatherResponse;
  location: GeocodingResult;
  today: ProcessedDailyData;
}

export function CurrentWeather({ weather, location, today }: Props) {
  const c = weather.current;
  const weatherInfo = getWeatherInfo(c.weather_code, c.is_day);
  const windDir = getWindDirection(c.wind_direction_10m);
  const uvLabel = getUVLabel(c.uv_index);

  return (
    <div className="current-weather card">
      <div className="current-weather-main">
        <div className="current-weather-left">
          <div className="current-location">
            <IconMapPin size={14} stroke={1.5} />
            <span>{location.name}</span>
            <span className="current-location-country">{location.country}</span>
          </div>
          <div className="current-temp-block">
            <span className="current-temp">{formatTemp(c.temperature_2m)}</span>
            <span className="current-temp-unit">C</span>
          </div>
          <div className="current-condition">{weatherInfo.label}</div>
          <div className="current-feels">
            <IconThermometer size={13} stroke={1.5} />
            Feels like {formatTemp(c.apparent_temperature)}
          </div>
          <div className="current-range">
            <span className="temp-max">{formatTemp(today.tempMax)}</span>
            <span className="temp-divider">/</span>
            <span className="temp-min">{formatTemp(today.tempMin)}</span>
          </div>
        </div>
        <div className="current-weather-right">
          <div className="current-icon-wrap">
            <WeatherIcon iconName={weatherInfo.iconName} size={80} stroke={1} />
          </div>
        </div>
      </div>

      <div className="current-stats">
        <div className="current-stat">
          <IconDroplets size={16} stroke={1.5} className="stat-icon stat-icon--humidity" />
          <span className="stat-value">{c.relative_humidity_2m}%</span>
          <span className="stat-label">Humidity</span>
        </div>
        <div className="current-stat">
          <IconWind size={16} stroke={1.5} className="stat-icon stat-icon--wind" />
          <span className="stat-value">{Math.round(c.wind_speed_10m)} km/h</span>
          <span className="stat-label">{windDir} Wind</span>
        </div>
        <div className="current-stat">
          <IconUvIndex size={16} stroke={1.5} className="stat-icon stat-icon--uv" />
          <span className="stat-value">{Math.round(c.uv_index)}</span>
          <span className="stat-label">UV {uvLabel}</span>
        </div>
        <div className="current-stat">
          <IconSunrise size={16} stroke={1.5} className="stat-icon stat-icon--sunrise" />
          <span className="stat-value">{formatTime(today.sunrise)}</span>
          <span className="stat-label">Sunrise</span>
        </div>
        <div className="current-stat">
          <IconSunset size={16} stroke={1.5} className="stat-icon stat-icon--sunset" />
          <span className="stat-value">{formatTime(today.sunset)}</span>
          <span className="stat-label">Sunset</span>
        </div>
        <div className="current-stat">
          <IconDroplets size={16} stroke={1.5} className="stat-icon stat-icon--precip" />
          <span className="stat-value">{today.precipitationProbability}%</span>
          <span className="stat-label">Rain chance</span>
        </div>
      </div>
    </div>
  );
}
