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
    url: "https://jsonplaceholder.typicode.com/posts",
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

      const response = await axios.get(`${this.state.url}`, { params });

      const headers = new Headers(response.headers);
      commit("totalPosts", +headers.get("X-Total-Count"));

      commit("posts", response.data);
      commit("loading", false);
    },

    async fetchPost({ commit, dispatch }, id) {
      commit("loading", true);
      await dispatch("fetchComments", id);

      const { data } = await axios.get(`${this.state.url}/${id}`);

      commit("post", data);
      commit("loading", false);
    },

    async savePost(_, payload) {
      if (payload.id) {
        return await axios.put(`${this.state.url}/${payload.id}`, payload);

        // commit("post", data);
      } else {
        return await axios.post(`${this.state.url}`, payload);
      }
    },

    async fetchComments({ commit }, id) {
      commit("loading", true);

      const { data } = await axios.get(`${this.state.url}/${id}/comments`);

      commit("comments", data);
      commit("loading", false);
    },
  },
});
