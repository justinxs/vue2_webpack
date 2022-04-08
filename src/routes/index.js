import Vue from 'vue';
import Router from 'vue-router';
import home from '@/views/home.vue';

Vue.use(Router);

export default new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: [
        {
            path: '/',
            component: home
        },
        {
            path: '/user',
            component: () => import('@/views/user/index.vue')
        },
        {
            path: '/chart',
            component: () => import('@/views/Chart.vue')
        }
    ]
});