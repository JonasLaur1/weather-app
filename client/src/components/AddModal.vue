<template>
  <div class="modal is-active">
    <div class="modal-background" @click="$emit('close')"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Add Forecast</p>
        <button class="delete" aria-label="close" @click="$emit('close')"></button>
      </header>
      <section class="modal-card-body">
        <div class="field">
          <label class="label">Search by</label>
          <div class="control">
            <div class="select">
              <select v-model="searchType">
                <option value="city">City Name</option>
                <option value="zip">ZIP Code</option>
                <option value="coords">Coordinates</option>
              </select>
            </div>
          </div>
        </div>

        <div class="field" v-if="searchType === 'coords'">
          <label class="label">Latitude</label>
          <div class="control">
            <input v-model.number="lat" class="input" type="number" placeholder="e.g. 54.6892" />
          </div>
          <label class="label mt-2">Longitude</label>
          <div class="control">
            <input v-model.number="lon" class="input" type="number" placeholder="e.g. 25.2797" />
          </div>
        </div>
        <div class="field" v-else>
          <label class="label">{{ searchType === 'city' ? 'City Name' : 'ZIP Code' }}</label>
          <div class="control">
            <input v-model="query" class="input" type="text" :placeholder="searchType === 'city' ? 'e.g. Vilnius' : 'e.g. 90210'" />
          </div>
        </div>
      </section>
      <footer class="modal-card-foot">
        <button @click="onSearch" class="button is-success">Search</button>
        <button @click="$emit('close')" class="button">Cancel</button>
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { WeatherLookupOptions } from '../types/weather'

const searchType = ref<'city' | 'zip' | 'coords'>('city')
const query = ref('')
const lat = ref<number | null>(null)
const lon = ref<number | null>(null)

function onSearch() {
  let options: WeatherLookupOptions
  if (searchType.value === 'city') {
    options = { city: query.value.trim() }
  } else if (searchType.value === 'zip') {
    options = { zip: query.value.trim() }
  } else {
    if (lat.value === null || lon.value === null) return
    options = { lat: lat.value, lon: lon.value }
  }
  ;(emits as any)('add', options)
}

const emits = defineEmits<{
  (e: 'add', opts: WeatherLookupOptions): void
  (e: 'close'): void
}>()
</script>