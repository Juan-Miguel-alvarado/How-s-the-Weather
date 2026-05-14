import type { GeocodingResponse, GeocodingResult } from '../types/weather';

const BASE_URL = 'https://geocoding-api.open-meteo.com/v1';

export async function searchCities(query: string): Promise<GeocodingResult[]> {
  if (!query.trim()) return [];
  const params = new URLSearchParams({
    name: query,
    count: '8',
    language: 'en',
    format: 'json',
  });
  const res = await fetch(`${BASE_URL}/search?${params}`);
  if (!res.ok) throw new Error('Failed to fetch city suggestions');
  const data: GeocodingResponse = await res.json();
  return data.results ?? [];
}
