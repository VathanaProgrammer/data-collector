<template>
  <div class="home-container">
    <Map />
  </div>
</template>

<script lang="ts">
import Map from '../components/Map.vue';
export default {
  name: 'Home',
  components: { Map },
}
</script>

<style scoped>
.home-container {
  height: calc(100vh - 128px);
  overflow: hidden;
}
</style>
