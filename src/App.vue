<template>
  <div class="bg-gray-50 w-screen h-screen flex flex-col mx-auto shadow-lg overflow-hidden max-w-[420px] relative">
    <Header />
    <main class="flex-1 overflow-y-auto p-4">
      <router-view />
    </main>
    <Footer @show-add-modal="showModal = true" />

    <!-- Overlay covers full page -->
    <transition name="fade">
      <div
        v-if="showModal"
        class="fixed inset-0 bg-black/50 z-40"
        @click="showModal = false"
      ></div>
    </transition>

    <!-- Modal inside layout -->
    <transition name="slide-up">
      <div
        v-if="showModal"
        class="absolute bottom-0 left-0 right-0 bg-white w-full rounded-t-2xl p-4 shadow-lg z-50"
      >
        <!-- Modal Header -->
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-bold">Add New Entry</h3>
          <button @click="showModal = false" class="text-gray-500 hover:text-gray-700">&times;</button>
        </div>

        <!-- Modal Body -->
        <div class="space-y-4">
          <input type="text" placeholder="Name" class="w-full p-3 rounded border border-gray-300" />
          <input type="tel" placeholder="Phone Number" class="w-full p-3 rounded border border-gray-300" />
          <button class="w-full bg-blue-600 text-white py-3 rounded mt-4">Take Photo</button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import Header from './components/layout/Header.vue';
import Footer from './components/layout/Footer.vue';
import { ref } from 'vue';

export default {
  name: 'App',
  components: { Header, Footer },
  setup() {
    const showModal = ref(false);
    return { showModal };
  },
};
</script>

<style scoped>
/* Slide-up animation inside layout */
.slide-up-enter-active,
.slide-up-leave-active {
  transition: transform 0.3s ease;
}
.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(100%);
}
.slide-up-enter-to,
.slide-up-leave-from {
  transform: translateY(0%);
}

/* Fade animation for overlay */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
</style>
