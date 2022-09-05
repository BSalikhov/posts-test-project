<template>
  <v-container class="form-container py-10 rounded-lg px-10 mt-10">
    <h2 class="mb-4 form-title">
      {{ isUpdatePage ? "Update" : "Create" }} Post
    </h2>

    <v-form v-model="valid" ref="form" @submit.prevent="sendForm()">
      <v-container>
        <v-row>
          <v-col cols="12 px-0">
            <v-text-field
              v-model="form.title"
              :rules="titleRules"
              label="Title"
              required
            ></v-text-field>
          </v-col>

          <v-col cols="12 px-0">
            <v-text-field
              v-model="form.body"
              :rules="bodyRules"
              label="Body"
              required
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <div class="mt-4 mx-auto">
            <v-btn @click="$router.go(-1)" class="mr-4">Cancel</v-btn>

            <v-btn type="submit" :disabled="!valid" color="primary"
              >{{ isUpdatePage ? "Update" : "Create" }} Post
              <v-icon class="ml-1" v-if="loading" size="large"
                >fas fa-circle-notch fa-spin</v-icon
              ></v-btn
            >
          </div>
        </v-row>
      </v-container>
    </v-form>
  </v-container>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "PostForm",

  data: () => ({
    valid: false,
    form: {
      title: "",
      body: "",
      userId: 1,
    },
    titleRules: [(v) => !!v || "Title is required"],
    bodyRules: [(v) => !!v || "Body is required"],
  }),

  computed: {
    ...mapState({
      post: (state) => state.post.post,
      loading: (state) => state.post.loading,
    }),

    isUpdatePage() {
      return this.$route.params.id;
    },
  },

  methods: {
    ...mapActions({
      fetchPost: "post/fetchPost",
      createPost: "post/createPost",
      updatePost: "post/updatePost",
    }),

    async sendForm() {
      if (this.valid) {
        try {
          if (this.isUpdatePage) {
            await this.updatePost({ id: this.post?.id, payload: this.form });
            this.$router.go(-1);
          } else {
            await this.createPost(this.form);
            this.$router.push({ name: "posts" });
          }

          this.$notify({
            text: "Successfully submitted",
            type: "success",
          });
        } catch (error) {
          this.$notify({
            text: error,
            type: "error",
          });
        }
      }
    },
  },

  async created() {
    if (this.isUpdatePage) {
      try {
        await this.fetchPost(this.$route.params.id);
        this.form.title = this.post.title;
        this.form.body = this.post.body;
      } catch (error) {
        this.$router.replace(`/posts/${this.$route.params.id}`);
      }
    }
  },
};
</script>

<style scoped>
.form-container {
  border: 1px solid gray;
}
</style>
