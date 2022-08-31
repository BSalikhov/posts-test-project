import axios from "axios";

export default {
  namespaced: true,

  state: {
    posts: [],
    loading: false,
    totalPosts: null,
  },

  mutations: {
    setPosts(state, posts) {
      state.posts = posts;
    },

    setLoading(state, loading) {
      state.loading = loading;
    },

    setTotalPosts(state, totalPosts) {
      state.totalPosts = totalPosts;
    },
  },

  actions: {
    async fetchPosts({ commit }, params = {}) {
      commit("setLoading", true);
      const response = await axios.get(``, { params });

      const headers = new Headers(response.headers);
      commit("setTotalPosts", +headers.get("X-Total-Count"));

      commit("setPosts", response.data);
      commit("setLoading", false);
    },
  },
};
