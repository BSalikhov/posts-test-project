<template>
  <v-col md="4">
    <v-card max-width="350" outlined>
      <v-list-item three-line>
        <v-list-item-content>
          <div class="text-overline mb-4">OVERLINE</div>

          <v-list-item-title class="text-h5 mb-1">
            {{ post.title }}
          </v-list-item-title>

          <v-list-item-subtitle>{{ post.body }}</v-list-item-subtitle>
        </v-list-item-content>

        <!-- Added random images here just for better view, I know that it is not the right implementation) -->
        <v-img
          lazy-src="@/assets/loader.gif"
          :src="`https://source.unsplash.com/random/200x200?sig=${
            post.id + 100
          }`"
          tile
          max-width="60"
          color="grey"
          alt="post image"
        >
        </v-img>
      </v-list-item>

      <v-card-actions>
        <v-btn @click="openDetails(post.id)" outlined rounded text>
          Read more
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-col>
</template>

<script>
export default {
  name: "Card",

  props: {
    post: {
      required: true,
      type: Object,
    },
  },

  methods: {
    openDetails(id) {
      this.$router.push({ path: `/posts/${id}` });
    },
  },
};
</script>
