import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import vuetify from "./plugins/vuetify";
import router from "./router";
import "./style/style.scss";
import "./axios";
import Notifications from "vue-notification";

Vue.config.productionTip = false;
Vue.use(Notifications);

new Vue({
  store,
  vuetify,
  router,
  render: (h) => h(App),
}).$mount("#app");
