import { createApp } from 'vue'
import App from './App.vue'
import router from "./router";
import { BootstrapIconsPlugin } from 'bootstrap-icons-vue';
import VueApexCharts from "vue3-apexcharts";
import store from './store';

import Datepicker from "@vuepic/vue-datepicker";


const app = createApp(App)
  .use(router)
  .use(BootstrapIconsPlugin)
  .use(VueApexCharts)
  .use(store)
  .use(Datepicker)
  .mount("#app");
 