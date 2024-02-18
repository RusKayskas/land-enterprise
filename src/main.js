import { createApp } from 'vue';
import App from './App.vue';
import '@/assets/scss/style.scss';
/* start plugins */
import 'keen-slider/keen-slider.min.css';
/* final-modal */
import { createVfm } from 'vue-final-modal';
import 'vue-final-modal/style.css';
import '@vueform/multiselect/themes/default.css';
const vfm = createVfm();
/* vue-mask*/
import VueTheMask from 'vue-the-mask';
/*VueTippy*/
import VueTippy from 'vue-tippy';
/*i18n*/
import i18n from './i18n.js';
import { ref } from 'vue';
export const $i18n = ref(i18n);
/*3d carousel*/
import Carousel3d from 'vue3-carousel-3d';
import 'vue3-carousel-3d/dist/index.css';
/* end plugins */
const app = createApp(App);
const pluginsArray = [vfm, VueTheMask, VueTippy, i18n, Carousel3d];
pluginsArray.forEach((plugin) => {
  app.use(plugin);
});

app.mount('#app');
