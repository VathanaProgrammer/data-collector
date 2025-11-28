<template>
  <div>
    <!-- Draggable & Clickable Add Button -->
    <button
      class="bg-blue-600 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:bg-blue-700 transition fixed z-50"
      :style="{ top: posY + 'px', left: posX + 'px', transform: 'rotate(' + rotation + 'deg)' }"
      @mousedown="startDrag"
      @touchstart.prevent="startDrag"
      @click="handleClick"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none"
           viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
      </svg>
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "FloatingAddButton",
  emits: ["show-add-modal"],
  setup(_, { emit }) {
    const posX = ref<number>(window.innerWidth - 80);
    const posY = ref<number>(window.innerHeight - 80);
    const dragging = ref<boolean>(false);
    const rotation = ref<number>(0);
    const offset = { x: 0, y: 0 };
    const dragThreshold = 5; // pixels to distinguish drag vs tap

    let startX = 0;
    let startY = 0;

    const startDrag = (e: MouseEvent | TouchEvent) => {
      dragging.value = true;

      if (e instanceof MouseEvent) {
        startX = e.clientX;
        startY = e.clientY;
        offset.x = startX - posX.value;
        offset.y = startY - posY.value;
        window.addEventListener("mousemove", drag);
        window.addEventListener("mouseup", stopDrag);
      } else if (e instanceof TouchEvent && e.touches[0]) {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
        offset.x = startX - posX.value;
        offset.y = startY - posY.value;
        window.addEventListener("touchmove", drag);
        window.addEventListener("touchend", stopDrag);
      }
    };

    const drag = (e: MouseEvent | TouchEvent) => {
      if (!dragging.value) return;

      let clientX = 0, clientY = 0;

      if (e instanceof MouseEvent) {
        clientX = e.clientX;
        clientY = e.clientY;
      } else if (e instanceof TouchEvent && e.touches[0]) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else return;

      posX.value = clientX - offset.x;
      posY.value = clientY - offset.y;

      // Keep inside viewport
      posX.value = Math.max(0, Math.min(posX.value, window.innerWidth - 56));
      posY.value = Math.max(0, Math.min(posY.value, window.innerHeight - 56));

      rotation.value += 5;
    };

    const stopDrag = (e?: MouseEvent | TouchEvent) => {
      dragging.value = false;

      if (e) {
        let endX = 0, endY = 0;

        if (e instanceof MouseEvent) {
          endX = e.clientX;
          endY = e.clientY;
          window.removeEventListener("mousemove", drag);
          window.removeEventListener("mouseup", stopDrag);
        } else if (e instanceof TouchEvent && e.changedTouches[0]) {
          endX = e.changedTouches[0].clientX;
          endY = e.changedTouches[0].clientY;
          window.removeEventListener("touchmove", drag);
          window.removeEventListener("touchend", stopDrag);
        }

        // Treat as tap if movement is very small
        if (Math.abs(endX - startX) < dragThreshold && Math.abs(endY - startY) < dragThreshold) {
          emit("show-add-modal");
        }
      }
    };

    const handleClick = () => {
      // Desktop click
      emit("show-add-modal");
    };

    return { posX, posY, rotation, startDrag, handleClick };
  },
});
</script>
