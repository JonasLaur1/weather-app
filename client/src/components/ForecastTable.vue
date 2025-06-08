<template>
  <table class="table is-fullwidth is-striped">
    <thead>
      <tr>
        <th>City</th>
        <th>Country</th>
        <th>Icon</th>
        <th>Temperature (°C)</th>
        <th>Humidity (%)</th>
        <th>Wind (m/s)</th>
        <th>Pressure (hPa)</th>
        <th>Sunrise</th>
        <th>Sunset</th>
        <th>Remove</th>
      </tr>
    </thead>
    <tbody>
      <tr v-if="items.length === 0">
        <td colspan="10" class="has-text-centered">No Forecasts Yet</td>
      </tr>
      <tr v-else v-for="f in items" :key="f.name">
        <td>{{ f.name }}</td>
        <td>{{ f.sys.country }}</td>
        <td>
          <img
            :src="`https://openweathermap.org/img/wn/${f.weather[0].icon}@2x.png`"
            alt="weather icon"
            width="32"
            height="32"
          />
        </td>
        <td>{{ f.main.temp.toFixed(1) }}°C</td>
        <td>{{ f.main.humidity }}%</td>
        <td>{{ f.wind.speed.toFixed(1) }} m/s</td>
        <td>{{ f.main.pressure }} hPa</td>
        <td>{{ formatTime(f.sys.sunrise) }}</td>
        <td>{{ formatTime(f.sys.sunset) }}</td>
        <td>
          <button
            @click="$emit('remove', f.name)"
            class="button is-small is-danger is-light"
          >✕</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import { defineProps, toRef } from 'vue'
import type { WeatherResponse } from '../types/weather'
import { formatTime } from '../utils/formatTime'

const props = defineProps<{ items: WeatherResponse[] }>()
const items = toRef(props, 'items')
</script>

