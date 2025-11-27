<template>
    <div class="sign-in-page h-screen w-screen flex items-center bg-white justify-center">
        <div class="sign-in-box p-2 md:p-8 bg-white w-96">
            <h2 class="text-2xl font-bold mb-6 text-center">Sign In</h2>
            <form @submit.prevent="handleSignIn">
                <div class="mb-4">
                    <label for="phone">Phone</label>
                    <input v-model="phone" type="tel" required class="w-full px-3 py-2 border rounded" />
                </div>
                <div class="mb-6">
                    <label for="password">Password</label>
                    <input v-model="password" type="password" required class="w-full px-3 py-2 border rounded" />
                </div>
                <button type="submit" class="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">Sign
                    In</button>
            </form>
        </div>
    </div>
</template>

<script>
import router from "@/router/router.js";
import axios from "axios";

export default {
    name: "SignIn",
    data() { return { phone: "", password: "" } },
    methods: {
        async handleSignIn() {
            try {
                const res = await axios.post("https://api.example.com/login", {
                    phone: this.phone,
                    password: this.password
                });
                localStorage.setItem("token", res.data.token);
                router.push("/"); // go to Home inside App layout
            } catch (err) {
                alert("Login failed");
            }
        }
    }
}
</script>


<style scoped>
.sign-in-box {
    max-width: 100%;
}
</style>
