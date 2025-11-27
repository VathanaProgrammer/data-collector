<template>
  <header class="bg-gray-900 text-white h-16 flex items-center justify-between px-4 shadow-md relative">
    <!-- Left empty for centering -->
    <div class="w-12"></div>

    <!-- Title -->
    <h1 class="text-lg font-bold text-center flex-1">LUXE</h1>

    <!-- Right side -->
    <div class="w-12 flex justify-end items-center space-x-2">
      <!-- Language button -->
      <button @click="$emit('show-lang-modal')" class="text-white font-bold hover:text-gray-300 transition">
        {{ currentLang.toUpperCase() }}
      </button>

      <!-- User / Login -->
      <template v-if="isAuthenticated">
        <!-- User icon -->
        <img
          v-if="user && user.isAuthenticated"
          :src="user.profile_url"
          alt="User"
          class="w-8 h-8 rounded-full border border-white"
        />
        <div v-else class="min-w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center text-sm">
          {{ userInitials }}
        </div>
      </template>
      <template v-else>
        <button @click="goLogin" class="text-white hover:text-gray-300 font-semibold">
          Login
        </button>
      </template>
    </div>
  </header>
</template>

<<script lang="ts">
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useUserStore } from '@/store/userStore';
import router from '@/router/router.js'; // <-- import router instance directly

export default {
  name: 'Header',
  emits: ['show-lang-modal'],
  data() {
    const { locale } = useI18n();
    return {
      currentLang: ref(locale.value),
    };
  },
  computed: {
    userStore() {
      return useUserStore();
    },
    isAuthenticated(): boolean {
      return this.userStore.isAuthenticated;
    },
    user() {
      return this.userStore.user;
    },
    userInitials(): string {
      if (!this.user?.username) return '';
      return this.user.username
        .split(' ')
        .map((n: string) => n[0])
        .join('')
        .toUpperCase();
    },
  },
  methods: {
    goLogin() {
      router.push('/sign-in'); // <-- now works
    },
  },
};
</script>


<style scoped>
header img {
  object-fit: cover;
}
</style>
