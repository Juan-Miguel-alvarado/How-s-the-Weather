import {
  LineChart, Line, BarChart, Bar, AreaChart, Area,
  ScatterChart, Scatter, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend, ZAxis,
} from 'recharts';
import type { ProcessedDailyData } from '../types/weather';
import './WeatherCharts.css';

interface Props {
  days: ProcessedDailyData[];
}

interface TooltipProps {
  active?: boolean;
  payload?: Array<{ name: string; value: number; color: string }>;
  label?: string;
}

function ChartTooltip({ active, payload, label }: TooltipProps) {
  if (!active || !payload?.length) return null;
  return (
    <div className="chart-tooltip">
      {label && <div className="chart-tooltip-label">{label}</div>}
      {payload.map(p => (
        <div key={p.name} className="chart-tooltip-row">
          <span className="chart-tooltip-dot" style={{ background: p.color }} />
          <span className="chart-tooltip-name">{p.name}</span>
          <span className="chart-tooltip-value">{p.value}</span>
        </div>
      ))}
    </div>
  );
}

export function WeatherCharts({ days }: Props) {
  const tempData = days.map(d => ({
    day: d.shortDay,
    Max: Math.round(d.tempMax),
    Min: Math.round(d.tempMin),
  }));

  const precipData = days.map(d => ({
    day: d.shortDay,
    Probability: d.precipitationProbability,
    Sum: Math.round(d.precipitationSum * 10) / 10,
  }));

  const windData = days.map(d => ({
    day: d.shortDay,
    'Wind km/h': Math.round(d.windSpeedMax),
  }));

  const scatterData = days.map(d => ({
    humidity: Math.round((d.precipitationProbability * 0.7 + 30)),
    temperature: Math.round(d.tempMax),
    day: d.shortDay,
  }));

  return (
    <div className="charts-section">
      <p className="section-title">Analytics</p>
      <div className="charts-grid">

        {/* Temperature Trend */}
        <div className="chart-card card">
          <h3 className="chart-title">Temperature Trend</h3>
          <p className="chart-sub">Daily high / low (°C)</p>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={tempData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="day" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fontSize: 12 }} tickLine={false} axisLine={false} tickFormatter={(v: number) => `${v}°`} />
              <Tooltip content={<ChartTooltip />} formatter={(v: number) => `${v}°C`} />
              <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 12 }} />
              <Line
                type="monotone"
                dataKey="Max"
                stroke="var(--chart-temp)"
                strokeWidth={2}
                dot={{ r: 3, strokeWidth: 0, fill: 'var(--chart-temp)' }}
                activeDot={{ r: 5, strokeWidth: 0 }}
              />
              <Line
                type="monotone"
                dataKey="Min"
                stroke="var(--chart-temp-min)"
                strokeWidth={2}
                dot={{ r: 3, strokeWidth: 0, fill: 'var(--chart-temp-min)' }}
                activeDot={{ r: 5, strokeWidth: 0 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Precipitation Probability */}
        <div className="chart-card card">
          <h3 className="chart-title">Precipitation</h3>
          <p className="chart-sub">Probability (%)</p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={precipData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="day" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fontSize: 12 }} tickLine={false} axisLine={false} domain={[0, 100]} tickFormatter={(v: number) => `${v}%`} />
              <Tooltip content={<ChartTooltip />} formatter={(v: number) => `${v}%`} />
              <Bar
                dataKey="Probability"
                fill="var(--chart-precip)"
                radius={[4, 4, 0, 0]}
                maxBarSize={36}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Wind Speed Area */}
        <div className="chart-card card">
          <h3 className="chart-title">Wind Speed</h3>
          <p className="chart-sub">Max daily (km/h)</p>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={windData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="windGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--chart-wind)" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="var(--chart-wind)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="day" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
              <Tooltip content={<ChartTooltip />} formatter={(v: number) => `${v} km/h`} />
              <Area
                type="monotone"
                dataKey="Wind km/h"
                stroke="var(--chart-wind)"
                strokeWidth={2}
                fill="url(#windGrad)"
                dot={{ r: 3, strokeWidth: 0, fill: 'var(--chart-wind)' }}
                activeDot={{ r: 5, strokeWidth: 0 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Humidity vs Temp Scatter */}
        <div className="chart-card card">
          <h3 className="chart-title">Rain Prob. vs Temp</h3>
          <p className="chart-sub">Correlation scatter</p>
          <ResponsiveContainer width="100%" height={200}>
            <ScatterChart margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="humidity"
                type="number"
                name="Rain Prob."
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={false}
                label={{ value: 'Est. Humidity %', position: 'insideBottom', offset: -2, style: { fontSize: 10, fill: 'var(--color-text-tertiary)' } }}
              />
              <YAxis
                dataKey="temperature"
                type="number"
                name="Temp"
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={false}
                tickFormatter={(v: number) => `${v}°`}
              />
              <ZAxis range={[40, 40]} />
              <Tooltip
                cursor={{ strokeDasharray: '3 3' }}
                content={({ active, payload }) => {
                  if (!active || !payload?.length) return null;
                  const d = payload[0].payload as { day: string; humidity: number; temperature: number };
                  return (
                    <div className="chart-tooltip">
                      <div className="chart-tooltip-label">{d.day}</div>
                      <div className="chart-tooltip-row">
                        <span className="chart-tooltip-name">Humidity</span>
                        <span className="chart-tooltip-value">{d.humidity}%</span>
                      </div>
                      <div className="chart-tooltip-row">
                        <span className="chart-tooltip-name">Temp</span>
                        <span className="chart-tooltip-value">{d.temperature}°C</span>
                      </div>
                    </div>
                  );
                }}
              />
              <Scatter
                data={scatterData}
                fill="var(--chart-humidity)"
                opacity={0.8}
              />
            </ScatterChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  );
}
