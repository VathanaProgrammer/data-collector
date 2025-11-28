<template>
  <div class="home-container h-full w-full flex items-center justify-center bg-gray-100">
    <div class="p-10 bg-gray-200 rounded-xl flex flex-col items-center space-y-6">
      <h1 class="sob-text text-8xl font-bold text-gray-800">SOB</h1>
      <h2 class="text-2xl text-gray-700">Drop Off</h2>
    </div>


  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import { useUserStore } from '../store/userStore';
import FloatingAddButton from "@/components/FloatingAddButton.vue";

export default defineComponent({
  name: 'Home',
  setup() {
    const userStore = useUserStore();

    onMounted(() => {
      console.log("User Info:", userStore?.user?.username);
      alert("Welcome back, " + (userStore?.user?.username || "User"));
    });

    return {};
  }
});
</script>

<style scoped>
.home-container {
  height: 100%;
  width: 100%;
}

.sob-text {
  /* Big shadow for each letter */
  text-shadow: 4px 4px 8px rgba(0,0,0,0.3), 
               6px 6px 12px rgba(0,0,0,0.2);
}
</style>
