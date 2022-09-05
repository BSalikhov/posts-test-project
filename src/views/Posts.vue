<template>
  <v-main>
    <v-container>
      <Toolbar :loading="loading" />

      <v-row>
        <Skeleton v-if="loading" />

        <Card v-else v-for="post in posts" :key="post.id" :post="post" />
      </v-row>
    </v-container>

    <v-pagination
      class="mt-4"
      v-model="currentPage"
      :length="lastPage"
      @input="pageChanged()"
    ></v-pagination>
  </v-main>
</template>

<script>
import { mapState, mapActions } from "vuex";

import Card from "../components/Card";
import Skeleton from "../components/Skeleton";
import Toolbar from "../components/Toolbar";

export default {
  components: {
    Card,
    Skeleton,
    Toolbar,
  },

  data: () => ({
    currentPage: 1,
    total: null,
    limit: 9,
  }),

  computed: {
    ...mapState({
      posts: (state) => state.posts.posts,
      totalPosts: (state) => state.posts.totalPosts,
      loading: (state) => state.posts.loading,
    }),

    lastPage() {
      return Math.ceil(this.totalPosts / this.limit);
    },
  },

  methods: {
    ...mapActions({
      fetchPosts: "posts/fetchPosts",
    }),

    pageChanged() {
      this.fetchPosts({ _page: this.currentPage, _limit: this.limit });
      this.$router.push({ query: { page: this.currentPage } });
    },
  },

  watch: {
    "$route.query.page": {
      async handler(value) {
        this.currentPage = +value || 1;
        await this.fetchPosts({
          _page: this.currentPage || 1,
          _limit: this.limit,
        });
      },
      immediate: true,
    },
  },

  created() {
    this.fetchPosts({ _page: this.currentPage, _limit: this.limit });
  },
};
</script>
