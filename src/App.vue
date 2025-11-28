<template>
  <div class="bg-gray-50 w-screen h-screen flex flex-col mx-auto shadow-lg overflow-hidden max-w-[420px] relative">
    <!-- Header -->
    <Header @show-lang-modal="showLangModal = true" :class="{ 'kh': langStore.currentLang === 'kh' }" />

    <!-- Main content -->
    <main class="flex-1 h-full">
      <router-view />
    </main>

    <AlertModal />

    <!-- Footer -->
    <Footer @show-add-modal="showAddModal = true" :class="{ 'kh': langStore.currentLang === 'kh' }" />

    <!-- Add Entry Modal Overlay -->
    <transition name="fade">
      <div v-if="showAddModal" class="absolute inset-0 bg-black/50 z-40" @click="showAddModal = false"></div>
    </transition>

    <!-- Hidden Inputs -->
    <input ref="cameraInput" type="file" accept="image/*" capture="environment" class="hidden"
      @change="handleCameraPhoto" />
    <input ref="galleryInput" type="file" accept="image/*" multiple class="hidden" @change="handleGalleryPhotos" />

    <transition name="slide-up">
      <div v-if="showAddModal" class="absolute bottom-0 left-0 right-0 bg-white w-full rounded-t-2xl p-4 shadow-lg z-50"
        :class="{ 'kh': langStore.currentLang === 'kh' }">

        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-semibold text-gray-800" :class="{ 'kh': langStore.currentLang === 'kh' } ">{{ currentText.addEntryHeader }}</h3>
          <button @click="showAddModal = false"
            class="text-gray-500 p-3 text-2xl hover:text-gray-700 rounded-full flex items-center justify-center">
            &times;
          </button>
        </div>

        <!-- Preview selected images -->
        <div v-if="photos.length" class="grid grid-cols-3 gap-2 mt-2 mb-2">
          <div v-for="(file, index) in photos" :key="index" class="relative">
            <img :src="file.preview" alt="preview" class="w-full h-24 object-cover rounded" />
            <button @click="removePhoto(index)"
              class="absolute top-1 right-1 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">×</button>
          </div>
        </div>

        <div class="space-y-4">
          <input v-model="nameInput" type="text" :placeholder="currentText.namePlaceholder"
            class="w-full p-3 rounded border border-gray-300" :class="{ kh: langStore.currentLang === 'kh' }" />
          <input v-model="phoneInput" type="tel" :placeholder="currentText.phonePlaceholder"
            class="w-full p-3 rounded border border-gray-300" :class="{ kh: langStore.currentLang === 'kh' }" />
          <input v-model="addressInput" type="text" :placeholder="currentText.addressPlaceholder"
            class="w-full p-3 rounded border border-gray-300" :class="{ kh: langStore.currentLang === 'kh' }" />

          <div class="flex space-x-2">
            <!-- Take Photo -->
            <button
              class="flex-1 bg-gray-200 text-black py-3 rounded flex items-center justify-center space-x-2 hover:bg-gray-300 transition"
              @click="openCamera">
              <Icon icon="mdi:camera" width="20" height="20" />
              <span>{{ currentText.takePhoto }}</span>
            </button>

            <!-- Select Photos -->
            <button
              class="flex-1 bg-gray-200 text-black py-3 rounded flex items-center justify-center space-x-2 hover:bg-gray-300 transition"
              @click="openGallery">
              <Icon icon="mdi:image-multiple" width="20" height="20" />
              <span>{{ currentText.selectPhotos }}</span>
            </button>
          </div>

          <!-- Submit Button -->
          <button
            class="w-full bg-green-500 text-white py-3 rounded flex items-center justify-center space-x-2 hover:bg-green-600 transition mt-2"
            @click="submitEntry" :disabled="isLoading">
            <Icon icon="mdi:check" width="20" height="20" />
            <span>{{ isLoading ? currentText.submitting : currentText.submit }}</span>
          </button>
        </div>
      </div>
    </transition>

    <!-- Language Modal -->
    <transition name="fade">
      <div v-if="showLangModal" class="absolute inset-0 bg-black/50 z-40" @click="showLangModal = false"></div>
    </transition>

    <transition name="slide-up">
      <div v-if="showLangModal"
        class="absolute bottom-0 left-0 right-0 bg-white w-full rounded-t-2xl p-4 shadow-lg z-50"
        :class="{ 'kh': langStore.currentLang === 'kh' }">
        <h3 class="text-lg font-bold mb-4">{{ currentText.selectLanguage }}</h3>
        <ul class="space-y-2">
          <li>
            <button @click="switchLang('en')" class="w-full flex items-center p-3 rounded hover:bg-gray-100">
              <img :src="enFlag" class="w-6 h-6 mr-3" alt="English" /> English
            </button>
          </li>
          <li>
            <button @click="switchLang('kh')" class="w-full flex items-center p-3 rounded hover:bg-gray-100">
              <img :src="khFlag" class="w-6 h-6 mr-3" alt="Khmer" /> Khmer
            </button>
          </li>
        </ul>
        <button @click="showLangModal = false"
          class="mt-4 w-full bg-gray-200 text-gray-700 py-3 rounded font-bold hover:bg-gray-300 transition"
          :class="{ 'kh': langStore.currentLang === 'kh' }">
          {{ currentText.close }}
        </button>
      </div>
    </transition>

    <!-- Global Loading Overlay -->
    <transition name="fade">
      <div v-if="isLoading" class="absolute inset-0 z-50 flex items-center justify-center bg-black/30">
        <div class="bg-white p-4 rounded shadow flex items-center space-x-2">
          <Icon icon="mdi:loading" class="animate-spin" width="24" height="24" />
          <span>{{ currentText.submitting }}</span>
        </div>
      </div>
    </transition>
    <FloatingAddButton @toggle-add-modal="showAddModal = !showAddModal" />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from "vue";
import enFlag from "@/assets/images/en.webp";
import khFlag from "@/assets/images/kh.webp";
import Header from "./components/layout/Header.vue";
import Footer from "./components/layout/Footer.vue";
import API from "./api";
import { useUserStore } from "./store/userStore";
import { useLangStore } from "./store/langStore";
import langDataJson from "@/lang.json";
import type { LangData } from "@/types/lang";
import { Icon } from '@iconify/vue';
import FloatingAddButton from "./components/FloatingAddButton.vue";
import AlertModal from "./components/AlertModal.vue";

const langData = langDataJson as LangData;

interface PreviewFile extends File {
  preview: string;
}

export default defineComponent({
  name: "App",
  components: { Header, Footer, Icon, FloatingAddButton, AlertModal },
  data() {
    return {
      showAddModal: false,
      showLangModal: false,
      nameInput: "",
      phoneInput: "",
      addressInput: '',
      photos: [] as PreviewFile[],
      enFlag,
      khFlag,
      isLoading: false,
    };
  },
  setup() {
    const langStore = useLangStore();
    const currentText = computed(() => langData[langStore.currentLang as keyof LangData]);
    return { langStore, currentText };
  },
  mounted() {
    // Default language to Khmer
    const langStore = useLangStore();
    if (!langStore.currentLang) {
      langStore.switchLang('kh');
    }
  },
  methods: {
    switchLang(lang: string) {
      const langStore = useLangStore();
      langStore.switchLang(lang);
      this.$i18n.locale = lang;
      this.showLangModal = false;
    },
    openCamera(event?: Event) {
      event?.stopPropagation();
      (this.$refs.cameraInput as HTMLInputElement).click();
    },
    openGallery(event?: Event) {
      event?.stopPropagation();
      (this.$refs.galleryInput as HTMLInputElement).click();
    },

    handleCameraPhoto(event: Event) {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (file) this.addPreview(file);
    },
    handleGalleryPhotos(event: Event) {
      const files = (event.target as HTMLInputElement).files;
      if (files) Array.from(files).forEach(f => this.addPreview(f));
    },
    addPreview(file: File) {
      const previewFile = file as PreviewFile;
      previewFile.preview = URL.createObjectURL(file);
      this.photos.push(previewFile);
    },
    removePhoto(index: number) {
      const photo = this.photos[index];
      if (photo) {
        URL.revokeObjectURL(photo.preview);
        this.photos.splice(index, 1);
      }
    },
    async submitEntry() {
      if (this.photos.length === 0) {
        alert("Please select at least one photo before submitting.");
        return;
      }
      this.isLoading = true;

      try {
        const userStore = useUserStore();
        const userId = userStore.user?.id;
        let latitude = null;
        let longitude = null;

        if (navigator.geolocation) {
          await new Promise((resolve) => {
            navigator.geolocation.getCurrentPosition(
              pos => { latitude = pos.coords.latitude; longitude = pos.coords.longitude; resolve(true); },
              () => resolve(true)
            );
          });
        }

        const form = new FormData();
        form.append("name", this.nameInput);
        form.append("phone", this.phoneInput);
        form.append("address_detail", this.addressInput);
        form.append("latitude", latitude ?? "");
        form.append("longitude", longitude ?? "");
        form.append("collector_id", userId);

        this.photos.forEach(file => {
          const fileName = file.name || `photo-${Date.now()}.jpg`;
          form.append("photos[]", file, fileName);
        });

        const res = await API.post("/save", form, { headers: { "Content-Type": "multipart/form-data" } });

        this.nameInput = "";
        this.phoneInput = "";
        this.addressInput = "";
        this.photos.forEach(p => URL.revokeObjectURL(p.preview));
        this.photos = [];
        this.showAddModal = false;

        alert(res.data.msg || "Entry submitted successfully!");
      } catch (err: any) {
        console.error("Upload failed:", err);
        alert(err.response?.data?.msg || "An error occurred while submitting entry.");
      } finally {
        this.isLoading = false;
      }
    }
  }
});
</script>

<style scoped>

main {
  height: calc(100vh - 128px);
  overflow: hidden;
}

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
