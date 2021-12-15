import Vue from 'vue';

import '@/styles/index.scss'; // global css

import App from './App.vue';
import store from './store';
import router from './routes';

import i18n from './lang'; // Internationalization

import * as filters from './filters'; // global filters
import Layout from '@/components/Layout.vue';
import globalMixin from '@/mixins/global';


// register global utility filters.
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key]);
});
Vue.component('layout', Layout);
Vue.mixin(globalMixin);

Vue.config.productionTip = false;

new Vue({
    el: '#app',
    router,
    store,
    i18n,
    render: h => h(App)
});