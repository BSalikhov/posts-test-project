import axios from "axios";

export default {
  namespaced: true,

  state: {
    post: null,
    comments: null,
    loading: false,
  },

  mutations: {
    setPost(state, post) {
      state.post = post;
    },

    resetPost(state) {
      state.post = null;
    },

    setComments(state, comments) {
      state.comments = comments;
    },

    setLoading(state, loading) {
      state.loading = loading;
    },
  },

  actions: {
    async fetchPost({ commit, dispatch }, id) {
      commit("setLoading", true);

      await dispatch("fetchComments", id);

      const { data } = await axios.get(`/${id}`);

      commit("setPost", data);
      commit("setLoading", false);
    },

    async updatePost(_, { id, payload }) {
      return await axios.put(`/${id}`, payload);
    },

    async createPost(_, payload) {
      return await axios.post(``, payload);
    },

    async deletePost(_, id) {
      return await axios.delete(`/${id}`);
    },

    async fetchComments({ commit }, id) {
      const { data } = await axios.get(`/${id}/comments`);

      commit("setComments", data);
    },
  },
};
