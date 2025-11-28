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
      <template v-if="user">
        <!-- User icon -->
        <img
          v-if="user.isAuthenticated"
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

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from "vue";
import { useUserStore } from "@/store/userStore";
import API from "@/api";
import router from "@/router/router";

export default defineComponent({
  name: "Header",
  emits: ["show-lang-modal"],
  setup() {
    const userStore = useUserStore();
    const currentLang = ref("en");

    // Fetch user from backend (secure) on mount

    onMounted(() => {
      
    });

    const user = computed(() => userStore.user);

    const userInitials = computed(() => {
      if (!user.value?.username) return "";
      return user.value.username
        .split(" ")
        .map((n: string) => n[0])
        .join("")
        .toUpperCase();
    });

    const goLogin = () => router.push("/sign-in");

    return { currentLang, user, userInitials, goLogin };
  },
});
</script>

<style scoped>
header img {
  object-fit: cover;
}
</style>
