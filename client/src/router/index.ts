import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Results from '../pages/Results.vue';
import Index from '../pages/Index.vue';

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'index',
        component: Index,
    },
    {
        path: '/results',
        name: 'results',
        component: Results,
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;
