<template>
  <div class="bg-gray-50 w-screen h-screen flex flex-col mx-auto shadow-lg overflow-hidden max-w-[420px] relative">
    <!-- Header -->
    <Header @show-lang-modal="showLangModal = true" />

    <!-- Main content -->
    <main class="flex-1 h-full">
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
        <!-- Preview selected images -->
        <div v-if="photos.length" class="grid grid-cols-3 gap-2 mt-2 mb-2">
          <div v-for="(file, index) in photos" :key="index" class="relative">
            <img :src="file.preview" alt="preview" class="w-full h-24 object-cover rounded" />
            <button @click="removePhoto(index)"
              class="absolute top-1 right-1 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">×</button>
          </div>
        </div>


        <div class="space-y-4">
          <input v-model="nameInput" type="text" placeholder="Name" class="w-full p-3 rounded border border-gray-300" />
          <input v-model="phoneInput" type="tel" placeholder="Phone Number"
            class="w-full p-3 rounded border border-gray-300" />
          <input v-model="addressInput" type="text" placeholder="Address details"
            class="w-full p-3 rounded border border-gray-300" />

          <div class="flex space-x-2">
            <!-- <button class="flex-1 bg-blue-600 text-white py-3 rounded" @click="openCamera">Take Photo</button> -->
            <button class="flex-1 bg-gray-800 text-white py-3 rounded" @click="openGallery">Select Photos</button>
          </div>

          <input ref="cameraInput" type="file" accept="image/*" capture="environment" class="hidden"
            @change="handleCameraPhoto" />
          <input ref="galleryInput" type="file" accept="image/*" multiple class="hidden"
            @change="handleGalleryPhotos" />

          <button class="w-full bg-green-600 text-white py-3 rounded" @click="submitEntry">Submit Entry</button>
        </div>
      </div>
    </transition>

    <!-- Language Modal -->
    <transition name="fade">
      <div v-if="showLangModal" class="absolute inset-0 bg-black/50 z-40" @click="showLangModal = false"></div>
    </transition>

    <transition name="slide-up">
      <div v-if="showLangModal"
        class="absolute bottom-0 left-0 right-0 bg-white w-full rounded-t-2xl p-4 shadow-lg z-50">
        <h3 class="text-lg font-bold mb-4">Select Language</h3>
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
import API from "./api";
import { useUserStore } from "./store/userStore";

interface PreviewFile extends File {
  preview: string;
}

export default defineComponent({
  name: "App",
  components: { Header, Footer },
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
    };
  },
  methods: {
    switchLang(lang: string) {
      this.$i18n.locale = lang;
      this.showLangModal = false;
    },
    openCamera() {
      (this.$refs.cameraInput as HTMLInputElement).click();
    },
    openGallery() {
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
      try {
        // Get current user ID from store
        const userStore = useUserStore();
        console.log("Submitting entry for user:", userStore?.user);
        const userId = userStore?.user?.id; // adjust if using Pinia or Vuex differently

        // Get current geolocation (latitude, longitude)
        let latitude = null;
        let longitude = null;
        if (navigator.geolocation) {
          await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(
              pos => {
                latitude = pos.coords.latitude;
                longitude = pos.coords.longitude;
                resolve(true);
              },
              err => {
                console.warn("Geolocation failed:", err.message);
                resolve(true); // continue even if geolocation fails
              }
            );
          });
        }

        const form = new FormData();
        form.append("name", this.nameInput);
        form.append("phone", this.phoneInput);
        form.append("address_detail", this.addressInput);
        form.append("latitude", latitude ?? "");
        form.append("longitude", longitude ?? "");
        form.append("user_id", userId);

        this.photos.forEach(file => {
          const fileName = file.name || `photo-${Date.now()}.jpg`;
          form.append("photos[]", file, fileName);
        });

        const res = await API.post("/save", form, {
          headers: { "Content-Type": "multipart/form-data" }
        });

        // Clear inputs and revoke previews
        this.nameInput = "";
        this.phoneInput = "";
        this.addressInput = "";
        this.photos.forEach(p => URL.revokeObjectURL(p.preview));
        this.photos = [];
        this.showAddModal = false;

        if (res.data.success) {
          alert(res.data.msg || "Entry submitted successfully!");
        } else {
          alert(res.data.msg || "Submission failed");
        }

      } catch (err: any) {
        console.error("Upload failed:", err);
        alert(err.response?.data?.msg || "An error occurred while submitting entry.");
      }
    }

  }
});
</script>

<style scoped>
main {
  height: calc(100vh - 128px);
  /* HEADER + FOOTER */
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
