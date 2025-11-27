<template>
  <div class="home-container h-full w-full">
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
  height: 100%;
  overflow: hidden;
}

</style>
