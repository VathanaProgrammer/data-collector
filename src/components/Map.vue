<template>
  <GMapMap
    :center="{ lat: 11.5564, lng: 104.9282 }"
    :zoom="12"
    class="map-area"
  />
</template>

<script>
export default {
  name: "Map",
};
</script>

<style scoped>
.map-area {
  width: 100%;
  height: calc(100vh - 128px); /* 64px header + 64px footer */
}
</style>
