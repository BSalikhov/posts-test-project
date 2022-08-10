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
              >{{ isUpdatePage ? "Update" : "Create" }} Post</v-btn
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
    isUpdatePage: false,
    form: {
      title: "",
      body: "",
      id: null,
      userId: 1,
    },
    titleRules: [(v) => !!v || "Title is required"],
    bodyRules: [(v) => !!v || "Body is required"],
  }),

  computed: {
    ...mapState({
      post: (state) => state.post,
    }),
  },

  methods: {
    ...mapActions({
      fetchPost: "fetchPost",
      savePost: "savePost",
    }),

    sendForm() {
      if (this.valid) {
        this.savePost(this.form).then(() => {
          this.$router.push({ name: "posts" });
        });
      }
    },
  },

  watch: {
    "$route.name": {
      async handler(value) {
        if (value === "update") {
          this.isUpdatePage = true;

          await this.fetchPost(this.$route.params.id);
          this.form.title = this.post.title;
          this.form.body = this.post.body;
          this.form.id = this.post.id;
        } else {
          this.form.title = "";
          this.form.body = "";
        }
      },
      immediate: true,
    },
  },
};
</script>

<style scoped>
.form-container {
  border: 1px solid gray;
}

.form-title {
}
</style>
