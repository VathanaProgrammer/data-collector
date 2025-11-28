<template>
  <div class="home-container h-full w-full flex items-center justify-center bg-gray-100">
    <div class="p-10 bg-gray-200 rounded-xl flex flex-col items-center space-y-6">
      <h1 class="sob-text text-8xl font-bold text-gray-800">SOB</h1>
      <h2 class="text-2xl text-gray-700">Drop Off</h2>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useUserStore } from '../store/userStore';
import { alert } from "@/alertService";
export default defineComponent({
  name: "Home",
  components: {  },
  data() {
    return {
      alertVisible: false,
      alertMessage: "",
      alertTitle: "",   // Will be set based on type if empty
      alertType: "success" as "success" | "error" | "info", // default type
    };
  },
  mounted() {
    const userStore = useUserStore();
    
    alert({
      type: "info",
      message: `Welcome back, ${userStore.user?.username || 'User'}!`,
    });
  },
});
</script>

<style scoped>
.home-container {
  height: 100%;
  width: 100%;
}

.sob-text {
  /* Big shadow for each letter */
  text-shadow: 4px 4px 8px rgba(0, 0, 0, 0.3),
               6px 6px 12px rgba(0, 0, 0, 0.2);
}
</style>
