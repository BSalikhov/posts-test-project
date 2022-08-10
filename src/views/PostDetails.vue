<template>
  <v-main>
    <Toolbar class="mt-10" />

    <Skeleton type="details" v-if="loading" />

    <v-container v-if="post && !loading" class="mt-6">
      <main>
        <v-row dense>
          <h1>{{ post.title }}</h1>

          <v-spacer></v-spacer>

          <v-btn @click="editPost" icon>
            <v-icon color="blue">mdi-pencil</v-icon>
          </v-btn>
        </v-row>

        <p class="mt-6">{{ post.body }}</p>
      </main>

      <section class="comments mt-10">
        <h3 class="mb-4">Comments</h3>

        <div class="d-flex mb-6" v-for="comment in comments" :key="comment.id">
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
    </v-container>
  </v-main>
</template>

<script>
import { mapState, mapActions } from "vuex";

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
      post: (state) => state.post,
      comments: (state) => state.comments,
      image: (state) => state.image,
      loading: (state) => state.loading,
    }),
  },

  methods: {
    ...mapActions({
      fetchPost: "fetchPost",
    }),

    editPost() {
      this.$router.push(`${this.$route.params.id}/update`);
    },
  },

  created() {
    this.fetchPost(this.$route.params.id);
  },
};
</script>
