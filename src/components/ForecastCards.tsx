import type { ProcessedDailyData } from '../types/weather';
import { formatTemp } from '../utils/weatherCodes';
import { getWeatherInfo } from '../utils/weatherCodes';
import { WeatherIcon } from './WeatherIcon';
import './ForecastCards.css';

interface Props {
  days: ProcessedDailyData[];
}

export function ForecastCards({ days }: Props) {
  return (
    <div className="forecast-section">
      <p className="section-title">7-Day Forecast</p>
      <div className="forecast-list">
        {days.map((day, i) => {
          const info = getWeatherInfo(day.weatherCode);
          const isToday = i === 0;
          return (
            <div key={day.date} className={`forecast-card card${isToday ? ' forecast-card--today' : ''}`}>
              <span className="forecast-day">{isToday ? 'Today' : day.dayName}</span>
              <span className="forecast-short-day">{isToday ? 'Now' : day.shortDay}</span>
              <div className="forecast-icon">
                <WeatherIcon iconName={info.iconName} size={28} stroke={1.5} />
              </div>
              <span className="forecast-condition">{info.label}</span>
              <div className="forecast-temps">
                <span className="forecast-temp-max">{formatTemp(day.tempMax)}</span>
                <span className="forecast-temp-min">{formatTemp(day.tempMin)}</span>
              </div>
              <div className="forecast-precip">
                <span className="forecast-precip-value">{day.precipitationProbability}%</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
