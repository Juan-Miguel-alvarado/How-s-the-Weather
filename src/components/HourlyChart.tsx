import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import type { ProcessedHourlyData } from '../types/weather';
import { WeatherIcon } from './WeatherIcon';
import { getWeatherInfo, formatTemp } from '../utils/weatherCodes';
import './HourlyChart.css';

interface Props {
  hours: ProcessedHourlyData[];
}

interface TooltipPayload {
  value: number;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayload[];
  label?: string;
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload?.length) return null;
  return (
    <div className="chart-tooltip">
      <span className="chart-tooltip-label">{label}</span>
      <span className="chart-tooltip-value">{formatTemp(payload[0].value)}</span>
    </div>
  );
}

export function HourlyChart({ hours }: Props) {
  const now = new Date();
  const currentHour = now.getHours();

  return (
    <div className="hourly-section">
      <p className="section-title">Hourly Today</p>

      <div className="hourly-scroll scroll-row">
        {hours.map((h) => {
          const info = getWeatherInfo(h.weatherCode);
          const isNow = new Date(h.time).getHours() === currentHour;
          return (
            <div key={h.time} className={`hourly-card card${isNow ? ' hourly-card--now' : ''}`}>
              <span className="hourly-time">{isNow ? 'Now' : h.hour}</span>
              <WeatherIcon iconName={info.iconName} size={22} stroke={1.5} className="hourly-icon" />
              <span className="hourly-temp">{formatTemp(h.temperature)}</span>
              <span className="hourly-precip">{h.precipitationProbability}%</span>
            </div>
          );
        })}
      </div>

      <div className="hourly-area-chart">
        <ResponsiveContainer width="100%" height={160}>
          <AreaChart data={hours} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="tempGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--chart-temp)" stopOpacity={0.18} />
                <stop offset="95%" stopColor="var(--chart-temp)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="hour"
              tick={{ fontSize: 11 }}
              tickLine={false}
              axisLine={false}
              interval={3}
            />
            <YAxis
              tick={{ fontSize: 11 }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(v: number) => `${v}°`}
            />
            <Tooltip content={<CustomTooltip />} />
            <ReferenceLine
              x={hours.find(h => new Date(h.time).getHours() === currentHour)?.hour}
              stroke="var(--color-accent)"
              strokeDasharray="4 2"
              strokeWidth={1.5}
            />
            <Area
              type="monotone"
              dataKey="temperature"
              stroke="var(--chart-temp)"
              strokeWidth={2}
              fill="url(#tempGrad)"
              dot={false}
              activeDot={{ r: 4, strokeWidth: 0 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
