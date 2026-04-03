import { createRouter, createWebHistory } from "vue-router";

export const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'main',
            component: () => import('@/views/MainView.vue'),
            redirect: '/overview',
            children: [
                {
                    path: 'overview',
                    name: 'overview',
                    component: () => import('@/components/overview/Overview.vue')
                },
                // {
                //     path: 'games',
                //     name: 'game-list',
                //     component: () => import('@/components/test.vue')
                // },
            ]
        }
    ]
});