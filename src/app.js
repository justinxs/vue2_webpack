import Vue from 'vue';

import '@/styles/index.scss'; // global css

import App from './App.vue';
import store from './store';
import router from './routes';
// 模拟数据只应用到开发环境
import '@/mock';

import i18n from './lang'; // Internationalization

import * as filters from './filters'; // global filters
import Layout from '@/components/Layout.vue';
import globalMixin from '@/mixins/global';

// register global utility filters.
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key]);
});
Vue.component('V2Layout', Layout);
Vue.mixin(globalMixin);

Vue.config.productionTip = false;

new Vue({
    el: '#app',
    router,
    store,
    i18n,
    render: h => h(App)
});
