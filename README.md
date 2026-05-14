# how-is-the-weather

A weather analytics dashboard built with React, Vite, and TypeScript. Displays current conditions, hourly breakdowns, 7-day forecasts, and analytics charts for any city in the world — powered by the Open-Meteo API (free, no key required).

<img width="1366" height="768" alt="image" src="https://github.com/user-attachments/assets/d75a6743-a94c-43be-9673-40210e3f7054" />


## Stack

| Layer | Technology |
|---|---|
| Framework | React 18 + Vite 5 |
| Language | TypeScript 5 |
| Charts | Recharts |
| Icons | @tabler/icons-react |
| Styling | CSS Variables (no framework) |
| APIs | Open-Meteo (free, no auth) |

## Features

**Search** — City autocomplete with debounced input, keyboard navigation, and country/region labels via the Open-Meteo Geocoding API.

**Current conditions** — Temperature, feels-like, humidity, wind speed and direction, UV index with label, sunrise/sunset times, and precipitation probability.

**Hourly breakdown** — Scrollable card row for today's hours plus an area chart with a reference line at the current hour.

**7-day forecast** — Daily cards with high/low temperatures, weather icon, condition label, and rain probability. Today's card is highlighted.

**Analytics** — Four charts built with Recharts:
- Temperature trend — daily max/min line chart
- Precipitation probability — bar chart
- Wind speed — area chart
- Rain probability vs temperature — scatter chart

**Dark mode** — Toggle persisted in `localStorage`. Applied via `data-theme="dark"` on `<html>` using CSS custom properties.

## Getting started

No API key needed. Just install and run.

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173), search for any city, and explore.

### Other scripts

```bash
npm run build     # production build → dist/
npm run preview   # preview the production build locally
```

## Project structure

```
src/
├── api/
│   ├── geocoding.ts         # city search — Open-Meteo Geocoding API
│   └── weather.ts           # forecast fetch — Open-Meteo Forecast API
├── components/
│   ├── CurrentWeather.tsx   # current conditions card
│   ├── ForecastCards.tsx    # 7-day forecast grid
│   ├── HourlyChart.tsx      # hourly scroll row + area chart
│   ├── SearchBar.tsx        # debounced autocomplete search
│   ├── ThemeToggle.tsx      # light/dark switch button
│   ├── WeatherCharts.tsx    # analytics charts section
│   └── WeatherIcon.tsx      # WMO code → Tabler icon mapping
├── hooks/
│   ├── useTheme.ts          # theme state + localStorage persistence
│   └── useWeather.ts        # fetch state machine
├── styles/
│   ├── variables.css        # CSS custom properties (design tokens)
│   └── global.css           # base styles + layout utilities
├── types/
│   └── weather.ts           # strict types for all API response shapes
├── utils/
│   └── weatherCodes.ts      # WMO weather code → label + icon name
├── App.tsx
└── main.tsx
```

## API notes

Both endpoints are free with no authentication or rate-limit account required.

| Endpoint | Description |
|---|---|
| `GET https://geocoding-api.open-meteo.com/v1/search?name={query}` | City autocomplete — returns coordinates, country, timezone |
| `GET https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lon}&...` | Forecast — current, hourly, and daily variables |

**Forecast variables fetched:**

| Scope | Variables |
|---|---|
| `current` | `temperature_2m`, `apparent_temperature`, `relative_humidity_2m`, `wind_speed_10m`, `wind_direction_10m`, `precipitation`, `uv_index`, `weather_code`, `is_day` |
| `hourly` | `temperature_2m`, `apparent_temperature`, `precipitation_probability`, `wind_speed_10m`, `relative_humidity_2m`, `weather_code`, `uv_index` |
| `daily` | `temperature_2m_max`, `temperature_2m_min`, `precipitation_sum`, `precipitation_probability_max`, `wind_speed_10m_max`, `uv_index_max`, `weather_code`, `sunrise`, `sunset` |

> Wind speed is requested in `km/h`. Timezone is set to `auto` so times are always local to the searched city.
