<template>
  <section class="section">
    <div class="container">
      <div class="level">
        <div class="level-left">
          <h1 class="title">Weather Dashboard</h1>
        </div>
        <div class="level-right">
          <input
            v-model="searchTerm"
            @input="applyFilter"
            type="text"
            class="input is-rounded is-normal"
            placeholder="Search for a city"
          />
          <button @click="showModal" class="button is-primary ml-2">
            Add Forecast
          </button>
        </div>
      </div>

      <AddModal
        v-if="isModalVisible"
        @close="isModalVisible = false"
        @add="handleAdd"
      />

      <ForecastTable :items="paginatedItems" @remove="handleRemove" />

      <Pagination
        :current-page="currentPage"
        :total-pages="totalPages"
        @page-change="page => currentPage = page"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import type { WeatherResponse } from './types/weather'
import AddModal from './components/AddModal.vue'
import ForecastTable from './components/ForecastTable.vue'
import Pagination from './components/Pagination.vue'
import { loadSavedForecasts, saveForecasts } from './services/storage.ts'
import { fetchWeather } from './services/openWeatherApi.ts'
import { RESULTS_PER_PAGE, REFRESH_INTERVAL_MS } from './utils/constants.ts'
import { showNotification } from './utils/notification.ts'

const allForecasts = ref<WeatherResponse[]>([])
const filteredForecasts = ref<WeatherResponse[]>([])
const searchTerm = ref('')
const currentPage = ref(1)
const isModalVisible = ref(false)

const totalPages = computed(() =>
  Math.max(1, Math.ceil(filteredForecasts.value.length / RESULTS_PER_PAGE))
)

console.log(totalPages);
const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * RESULTS_PER_PAGE
  return filteredForecasts.value.slice(start, start + RESULTS_PER_PAGE)
})

onMounted(() => {
  allForecasts.value = loadSavedForecasts()
  filteredForecasts.value = [...allForecasts.value]

  setInterval(async () => {
    if (allForecasts.value.length > 0) {
      try {
        const updated = await Promise.all(
          allForecasts.value.map(f => fetchWeather({ city: f.name }))
        )
        allForecasts.value = updated
        saveForecasts(allForecasts.value)
        applyFilter()
        showNotification('Forecasts refreshed', 'success')
      } catch (err: any) {
        showNotification(err.message, 'danger')
      }
    }
  }, REFRESH_INTERVAL_MS)
})

function applyFilter() {
  const term = searchTerm.value.toLowerCase()
  filteredForecasts.value = allForecasts.value.filter(f =>
    f.name.toLowerCase().includes(term)
  )
  currentPage.value = 1
}

async function handleAdd(options: any) {
  try {
    const data = await fetchWeather(options)
    allForecasts.value.push(data)
    saveForecasts(allForecasts.value)
    applyFilter()
    showNotification('Forecast added', 'success')
    isModalVisible.value = false
  } catch (err: any) {
    showNotification(err.message, 'danger')
  }
}

function handleRemove(city: string) {
  allForecasts.value = allForecasts.value.filter(f => f.name !== city)
  saveForecasts(allForecasts.value)
  applyFilter()
  showNotification('Forecast removed', 'success')
}

function showModal() {
  isModalVisible.value = true
}
</script>

<style scoped>
.ml-2 {
  margin-left: 0.5rem;
}
</style>
