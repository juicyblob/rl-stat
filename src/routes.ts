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
                {
                    path: 'games',
                    name: 'game-list',
                    component: () => import('@/components/game-list/GameList.vue')
                },
                {
                    path: 'top5',
                    name: 'top5',
                    component: () => import('@/components/top/TopMatches.vue')
                },
                {
                    path: 'rank-history',
                    name: 'rank-history',
                    component: () => import('@/components/rank-history/RankHistory.vue')
                },
            ]
        }
    ]
});