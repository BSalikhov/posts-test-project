import axios from "axios";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    posts: [],
    post: null,
    comments: null,
    loading: false,
    totalPosts: null,
  },

  mutations: {
    posts(state, posts) {
      state.posts = posts;
    },

    post(state, post) {
      state.post = post;
    },

    comments(state, comments) {
      state.comments = comments;
    },

    totalPosts(state, totalPosts) {
      state.totalPosts = totalPosts;
    },

    loading(state, loading) {
      state.loading = loading;
    },
  },

  actions: {
    async fetchPosts({ commit }, params = {}) {
      commit("loading", true);

      const response = await axios.get(``, { params });

      const headers = new Headers(response.headers);
      commit("totalPosts", +headers.get("X-Total-Count"));

      commit("posts", response.data);
      commit("loading", false);
    },

    async fetchPost({ commit, dispatch }, id) {
      commit("loading", true);
      await dispatch("fetchComments", id);

      const { data } = await axios.get(`/${id}`);

      commit("post", data);
      commit("loading", false);
    },

    async savePost(_, payload) {
      if (payload.id) {
        try {
          await axios.put(`/${payload.id}`, payload);
          this.$router.go(-1);

          Vue.notify({
            text: "Successfully updated",
            type: "success",
          });
        } catch (error) {
          Vue.notify({
            text: error,
            type: "error",
          });
        }
      } else {
        try {
          await axios.post(`ss`, payload);
          this.$router.push({ name: "posts" });

          Vue.notify({
            text: "Successfully created",
            type: "success",
          });
          return;
        } catch (error) {
          Vue.notify({
            text: error,
            type: "error",
          });
          return;
        }
      }
    },

    async fetchComments({ commit }, id) {
      commit("loading", true);

      const { data } = await axios.get(`/${id}/comments`);

      commit("comments", data);
      commit("loading", false);
    },
  },
});
