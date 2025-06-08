<template>
  <nav class="pagination" role="navigation" aria-label="pagination">
    <a 
      class="pagination-previous" 
      :class="{ 'is-disabled': currentPage === 1 }"
      @click="currentPage === 1 ? null : changePage(currentPage-1)"
    >
      Previous
    </a>
    <a 
      class="pagination-next" 
      :class="{ 'is-disabled': currentPage === totalPages }"
      @click="currentPage === totalPages ? null : changePage(currentPage+1)"
    >
      Next
    </a>
    <ul class="pagination-list">
      <li><span class="pagination-link is-current">{{currentPage}} of {{totalPages}}</span></li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

const props = defineProps<{ currentPage: number; totalPages: number }>()
const emit = defineEmits<(e: 'page-change', page: number) => void>()

function changePage(page: number) {
  if (page >= 1 && page <= props.totalPages) {
    emit('page-change', page)
  }
}
</script>

<style scoped>
.pagination-previous.is-disabled,
.pagination-next.is-disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}
</style>