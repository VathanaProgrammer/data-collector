<template>
  <div class="bg-gray-50 w-screen h-screen flex flex-col mx-auto shadow-lg overflow-hidden max-w-[420px] relative">
    <!-- Header -->
    <Header @show-lang-modal="showLangModal = true" />

    <!-- Main content: no scroll here -->
    <main class="flex-1 overflow-hidden">
      <router-view />
    </main>

    <!-- Footer -->
    <Footer @show-add-modal="showAddModal = true" />

    <!-- Add Entry Modal Overlay -->
    <transition name="fade">
      <div v-if="showAddModal" class="absolute inset-0 bg-black/50 z-40" @click="showAddModal = false"></div>
    </transition>

    <transition name="slide-up">
      <div v-if="showAddModal"
        class="absolute bottom-0 left-0 right-0 bg-white w-full rounded-t-2xl p-4 shadow-lg z-50">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-bold">Add New Entry</h3>
          <button @click="showAddModal = false" class="text-gray-500 hover:text-gray-700">&times;</button>
        </div>

        <div class="space-y-4">
          <input type="text" placeholder="Name" class="w-full p-3 rounded border border-gray-300" />
          <input type="tel" placeholder="Phone Number" class="w-full p-3 rounded border border-gray-300" />

          <!-- Take Photo -->
          <button class="w-full bg-blue-600 text-white py-3 rounded" @click="openCamera">
            Take Photo
          </button>

          <!-- Select Multiple Photos -->
          <button class="w-full bg-gray-800 text-white py-3 rounded" @click="openGallery">
            Select Photos
          </button>

          <!-- Hidden Camera Input -->
          <input ref="cameraInput" type="file" accept="image/*" capture="environment" class="hidden"
            @change="handleCameraPhoto" />

          <!-- Hidden Multiple Photo Input -->
          <input ref="galleryInput" type="file" accept="image/*" multiple class="hidden"
            @change="handleGalleryPhotos" />
        </div>
      </div>
    </transition>


    <!-- Language Modal Overlay -->
    <transition name="fade">
      <div v-if="showLangModal" class="absolute inset-0 bg-black/50 z-40" @click="showLangModal = false"></div>
    </transition>

    <!-- Language Modal inside layout -->
    <transition name="slide-up">
      <div v-if="showLangModal"
        class="absolute bottom-0 left-0 right-0 bg-white w-full rounded-t-2xl p-4 shadow-lg z-50">
        <h3 class="text-lg font-bold mb-4">Select Language</h3>
        <ul class="space-y-2">
          <li>
            <button @click="switchLang('en')" class="w-full flex items-center p-3 rounded hover:bg-gray-100">
              <img :src="enFlag" class="w-6 h-6 mr-3" alt="English" />
              English
            </button>
          </li>
          <li>
            <button @click="switchLang('kh')" class="w-full flex items-center p-3 rounded hover:bg-gray-100">
              <img :src="khFlag" class="w-6 h-6 mr-3" alt="Khmer" />
              Khmer
            </button>
          </li>
        </ul>

        <!-- Close button at the bottom -->
        <button @click="showLangModal = false"
          class="mt-4 w-full bg-gray-200 text-gray-700 py-3 rounded font-bold hover:bg-gray-300 transition">
          Close
        </button>
      </div>
    </transition>

  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import enFlag from "@/assets/images/en.webp";
import khFlag from "@/assets/images/kh.webp";
import Header from "./components/layout/Header.vue";
import Footer from "./components/layout/Footer.vue";
import axios from "axios";

export default defineComponent({
  name: "App",
  components: { Header, Footer },

  data() {
    return {
      showAddModal: false,
      showLangModal: false,

      nameInput: "",
      phoneInput: "",

      photos: [] as File[], // <-- FIX: correct type

      enFlag,
      khFlag,
    };
  },

  methods: {
    switchLang(lang: string) {
      this.$i18n.locale = lang;
      this.showLangModal = false;
    },

    openCamera() {
      const input = this.$refs.cameraInput as HTMLInputElement | null;
      input?.click();
    },

    openGallery() {
      const input = this.$refs.galleryInput as HTMLInputElement | null;
      input?.click();
    },

    handleCameraPhoto(event: Event) {
      const target = event.target as HTMLInputElement;
      const file = target.files?.[0];
      if (!file) return;
      this.photos.push(file); // <-- FIX: correct type File[]
    },

    handleGalleryPhotos(event: Event) {
      const target = event.target as HTMLInputElement;
      const files = target.files;
      if (!files) return;

      this.photos.push(...Array.from(files)); // <-- FIX: no TS error
    },

    async submitEntry() {
      try {
        const form = new FormData();
        form.append("name", this.nameInput);
        form.append("phone", this.phoneInput);

        this.photos.forEach((file) => {
          form.append("photos[]", file);
        });

        const res = await axios.post("https://your-api.com/api/save", form, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        console.log("Upload success:", res.data);

        this.nameInput = "";
        this.phoneInput = "";
        this.photos = [];
        this.showAddModal = false;
      } catch (err) {
        console.error("Upload failed:", err);
      }
    },
  },
});
</script>


<style scoped>
/* Slide-up animation */
.slide-up-enter-active,
.slide-up-leave-active {
  transition: transform 0.3s ease;
}

.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(100%);
}

.slide-up-enter-to,
.slide-up-leave-from {
  transform: translateY(0%);
}

/* Fade animation for overlay */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
</style>
