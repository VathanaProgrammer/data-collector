import { createRouter, createWebHistory } from 'vue-router';
import SignIn from '../pages/Sign-in.vue';
import Home from '../pages/Home.vue';
const routes = [
    {
        path: '/', component: Home
    },
    {
        path: '/sign-in',
        name: 'SignIn',
        component: SignIn,
    },

];

export default createRouter({
    history: createWebHistory(),
    routes,
});