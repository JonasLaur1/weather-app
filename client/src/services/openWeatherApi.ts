import axios from 'axios'
import type { WeatherResponse, WeatherLookupOptions } from '../types/weather'

const apiClient = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5/weather',
  timeout: 5000,
  params: {
    units: 'metric',
    appid: import.meta.env.VITE_OPENWEATHER_API_KEY,
  },
})

export async function fetchWeather(opts: WeatherLookupOptions): Promise<WeatherResponse> {
  const params: any = {}
  if ('city' in opts) params.q = opts.city
  else if ('zip' in opts) params.zip = opts.zip
  else { params.lat = opts.lat; params.lon = opts.lon }

  try {
    const res = await apiClient.get<WeatherResponse>('', { params })
    return res.data
  } catch (err: any) {
    if (axios.isAxiosError(err) && err.response?.status===404) {
      throw new Error('Location not found')
    }
    throw new Error(err.message)
  }
}