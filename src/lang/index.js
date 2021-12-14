import Vue from 'vue';
import VueI18n from 'vue-i18n';
import enLocale from './package/en.json';
import zhLocale from './package/zh.json';
import esLocale from './package/es.json';

Vue.use(VueI18n);

const messages = {
    en: {
        ...enLocale
    },
    zh: {
        ...zhLocale
    },
    es: {
        ...esLocale
    }
};

const i18n = new VueI18n({
    // set locale
    // options: en | zh | es
    locale: 'zh',
    // set locale messages
    messages
})

export default i18n;
