import Vue from "vue";
import Vuex from "vuex";

import posts from "./modules/posts";
import post from "./modules/post";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    posts,
    post,
  },
});
