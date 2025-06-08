import type { WeatherResponse } from '../types/weather'
const KEY='forecasts'
export function loadSavedForecasts(): WeatherResponse[] {
  try { return JSON.parse(localStorage.getItem(KEY)||'[]') }
  catch { return [] }
}
export function saveForecasts(a: WeatherResponse[]): void {
  localStorage.setItem(KEY, JSON.stringify(a))
}