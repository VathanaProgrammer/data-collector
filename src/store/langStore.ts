import { defineStore } from 'pinia';
import enFlag from "@/assets/images/en.webp";
import khFlag from "@/assets/images/kh.webp";

export const useLangStore = defineStore('langStore', {
  state: () => ({
    currentLang: 'en',
    flags: { en: enFlag, kh: khFlag } as Record<string, string>,
  }),
  getters: {
    currentFlag: (state) => state.flags[state.currentLang],
  },
  actions: {
    switchLang(lang: string) {
      this.currentLang = lang;
    }
  },
  persist: true, // language persists after refresh
});
