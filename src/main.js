import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import ToastPlugin from "vue-toast-notification";
import "vue-toast-notification/dist/theme-bootstrap.css";

const vuetify = createVuetify({
  components,
  directives,
});

createApp(App)
  .use(store)
  .use(router)
  .use(vuetify)
  .use(ToastPlugin)
  .mount("#app");
