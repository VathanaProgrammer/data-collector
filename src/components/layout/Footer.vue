<template>
  <footer class="bg-gray-200 h-16 flex items-center justify-between px-4 shadow-inner">
    <!-- Left: Home button -->
    <button class="flex flex-col items-center justify-center text-gray-700 hover:text-blue-600">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mb-1" fill="none"
        viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round"
          d="M3 12l9-9 9 9v9a3 3 0 01-3 3h-3v-6H9v6H6a3 3 0 01-3-3v-9z" />
      </svg>
      <span class="text-xs">Home</span>
    </button>

    <!-- Right: Add / Plus button -->
    <button
      @click="$emit('show-add-modal')"
      class="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:bg-blue-700 transition"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none"
        viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
      </svg>
    </button>
  </footer>
</template>

<script lang="ts">
export default {
  name: 'Footer',
}
</script>
