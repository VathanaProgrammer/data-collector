<template>
  <div class="home-container h-full w-full">
    <Map />

  </div>
</template>

<script lang="ts">
import { useUserStore } from '../store/userStore';
import Map from '../components/Map.vue';
export default {
  name: 'Home',
  components: { Map },
  mounted(){
    const userStore = useUserStore();
    alert("Welcome back, " + userStore.user.name || "User" );
  }
}
</script>

<style scoped>
.home-container {
  height: 100%;
  overflow: hidden;
}

</style>
