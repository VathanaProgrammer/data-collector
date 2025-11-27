import { defineStore } from "pinia";

export const useUserStore = defineStore("userStore", {
  state: () => ({
    user: null as any | null,    // store user info
    isAuthenticated: false,
  }),

  actions: {
    setUser(data: any) {
      this.user = data;
      this.isAuthenticated = true;
    },

    clearUser() {
      this.user = null;
      this.isAuthenticated = false;
    }
  },

  persist: {
    enabled: true,
    strategies: [
      {
        key: "user-data",
        storage: localStorage,
      },
    ],
  }
});
