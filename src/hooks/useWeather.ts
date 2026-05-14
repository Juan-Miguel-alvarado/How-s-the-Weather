import { useState, useCallback } from 'react';
import type { GeocodingResult, WeatherResponse, WeatherState } from '../types/weather';
import { fetchWeather } from '../api/weather';

export function useWeather() {
  const [state, setState] = useState<WeatherState>({
    location: null,
    weather: null,
    isLoading: false,
    error: null,
  });

  const loadWeather = useCallback(async (location: GeocodingResult) => {
    setState(s => ({ ...s, isLoading: true, error: null }));
    try {
      const weather: WeatherResponse = await fetchWeather(location.latitude, location.longitude);
      setState({ location, weather, isLoading: false, error: null });
    } catch (err) {
      setState(s => ({
        ...s,
        isLoading: false,
        error: err instanceof Error ? err.message : 'Unknown error',
      }));
    }
  }, []);

  return { ...state, loadWeather };
}
