import { createRouter, createWebHistory } from 'vue-router';
import CardOptions from '@/pages/CardOptions';
import CardComposition from '@/pages/CardComposition';


const routes = [
    {
        path: '/options',
        component: CardOptions
    },
    {
        path: '/composition',
        component: CardComposition
    }
]

const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL)
})

export default router