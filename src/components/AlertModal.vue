<template>
  <transition name="fade">
    <div v-if="visible" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 shadow-lg w-80 text-center">
        <div class="flex justify-center mb-4">
          <Icon v-if="type==='success'" icon="mdi:check-circle-outline" class="text-green-500" width="48" height="48"/>
          <Icon v-if="type==='error'" icon="mdi:alert-circle-outline" class="text-red-500" width="48" height="48"/>
          <Icon v-if="type==='info'" icon="mdi:information-outline" class="text-blue-500" width="48" height="48"/>
        </div>
        <h3 class="text-lg font-bold mb-4">{{ computedTitle }}</h3>
        <p class="mb-6">{{ message }}</p>
        <button @click="close" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">OK</button>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Icon } from '@iconify/vue';
import { alertService } from "@/alertService";

export default defineComponent({
  name: 'AlertModal',
  components: { Icon },
  data() {
    return {
      visible: false,
      message: '',
      type: 'success' as 'success' | 'error' | 'info'
    };
  },
  computed: {
    computedTitle(): string {
      switch (this.type) {
        case 'success': return 'Success';
        case 'error': return 'Error';
        case 'info': return 'Info';
      }
      return '';
    }
  },
  created() {
    alertService.register(this);
  },
  methods: {
    show(options: { type?: 'success' | 'error' | 'info'; message: string }) {
      this.message = options.message;
      this.type = options.type || 'success';
      this.visible = true;
    },
    close() {
      this.visible = false;
    }
  }
});
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.2s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
.fade-enter-to, .fade-leave-from { opacity: 1; }
</style>
