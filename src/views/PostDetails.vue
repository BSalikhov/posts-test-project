<template>
  <v-main>
    <v-container>
      <Toolbar
        @deletePost="removePost"
        @editPost="editPost"
        :post="post"
        :loading="loading"
      />

      <Skeleton type="details" v-if="loading" />

      <v-main v-if="post && !loading" class="mt-6">
        <div>
          <v-row dense>
            <h1 class="text-h5 font-weight-bold text-md-h4">
              {{ post.title }}
            </h1>
          </v-row>

          <p class="mt-6">{{ post.body }}</p>
        </div>

        <section class="comments mt-10">
          <h3 class="mb-4">Comments</h3>

          <div
            class="d-flex mb-6"
            v-for="comment in comments"
            :key="comment.id"
          >
            <!-- Again, the images are for fun bcs there are no images provided in API and I know that this implementation is not right) -->
            <v-img
              class="rounded-circle mr-4"
              lazy-src="@/assets/loader.gif"
              :src="`https://source.unsplash.com/random/200x200?sig=${
                comment.id + 100
              }`"
              max-height="50"
              max-width="50"
              alt="user avatar"
            />

            <div>
              <h4>{{ comment.email }}</h4>
              <h5 class="gray my-2">{{ comment.name }}</h5>
              <p>{{ comment.body }}</p>
            </div>
          </div>
        </section>
      </v-main>
    </v-container>
  </v-main>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";

import Skeleton from "../components/Skeleton";
import Toolbar from "../components/Toolbar";

export default {
  name: "PostDetails",

  components: {
    Skeleton,
    Toolbar,
  },

  computed: {
    ...mapState({
      post: (state) => state.post.post,
      loading: (state) => state.post.loading,
      comments: (state) => state.post.comments,
    }),
  },

  methods: {
    ...mapMutations({
      resetPost: "post/resetPost",
    }),

    ...mapActions({
      fetchPost: "post/fetchPost",
      deletePost: "post/deletePost",
    }),

    editPost() {
      this.$router.push(`${this.$route.params.id}/update`);
    },

    async removePost() {
      try {
        await this.deletePost(this.$route.params.id);
        this.$notify({
          text: "Successfully deleted post",
          type: "success",
        });
        this.$router.push({ name: "posts" });
      } catch (error) {
        this.$notify({
          text: error,
          type: "error",
        });
      }
    },
  },

  created() {
    this.fetchPost(this.$route.params.id);
  },

  destroyed() {
    this.resetPost();
  },
};
</script>
