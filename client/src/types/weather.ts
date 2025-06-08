export interface WeatherResponse {
  name:string
  sys:{ country:string; sunrise:number; sunset:number }
  main:{ temp:number; humidity:number; pressure:number }
  wind:{ speed:number }
  weather:Array<{ icon:string; main:string; description:string }>
}

export type WeatherLookupOptions =
  | { city:string }
  | { zip:string }
  | { lat:number; lon:number }