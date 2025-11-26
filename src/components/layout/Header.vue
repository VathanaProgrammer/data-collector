<template>
  <header class="bg-gray-900 text-white h-16 flex items-center justify-between px-4 shadow-md relative">
    <!-- Left empty for centering -->
    <div class="w-12"></div>

    <!-- Title -->
    <h1 class="text-lg font-bold text-center flex-1">LUXE</h1>

    <!-- Language switcher -->
    <div class="w-12 flex justify-end">
      <button @click="$emit('show-lang-modal')" class="text-white font-bold hover:text-gray-300 transition">
        {{ currentLang.toUpperCase() }}
      </button>
    </div>
  </header>
</template>

<script lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

export default {
  name: 'Header',
  emits: ['show-lang-modal'],
  setup() {
    const { locale } = useI18n();
    const currentLang = ref(locale.value);
    return { currentLang };
  },
};
</script>
