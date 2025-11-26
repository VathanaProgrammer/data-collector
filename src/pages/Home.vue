<template>
  <div class="space-y-4">
    <h2 class="text-xl font-bold">{{ $t('welcome') }}</h2>

    <input
      type="text"
      placeholder="Name"
      class="w-full p-3 rounded border border-gray-300"
    />

    <input
      type="tel"
      placeholder="Phone Number"
      class="w-full p-3 rounded border border-gray-300"
    />

    <button class="w-full bg-blue-600 text-white py-3 rounded mt-4">
      Take Photo
    </button>
  </div>
</template>

<script lang="ts">
export default {
  name: 'Home',
}
</script>
