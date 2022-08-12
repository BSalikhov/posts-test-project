<template>
  <v-container>
    <v-sheet v-if="type === 'list'" class="pa-4">
      <v-row>
        <v-col sm="6" md="4" xl="3" v-for="item in 9" :key="item">
          <v-skeleton-loader
            class="mx-auto"
            elevation="1"
            height="180"
            type="card"
          ></v-skeleton-loader>
        </v-col>
      </v-row>
    </v-sheet>

    <v-sheet v-if="type === 'details'" class="pa-3">
      <v-row class="mt-4">
        <v-skeleton-loader
          height="40"
          width="100%"
          elevation="1"
          type="card"
        ></v-skeleton-loader>
      </v-row>

      <v-row class="mt-8">
        <v-skeleton-loader
          height="20"
          width="100%"
          elevation="1"
          type="card"
        ></v-skeleton-loader>
      </v-row>

      <v-row class="mt-8">
        <v-skeleton-loader
          height="20"
          width="100%"
          elevation="1"
          type="card"
        ></v-skeleton-loader>
      </v-row>

      <v-row class="mt-8">
        <v-skeleton-loader
          height="200"
          width="100%"
          elevation="1"
          type="card"
        ></v-skeleton-loader>
      </v-row>
    </v-sheet>
  </v-container>
</template>

<script>
export default {
  name: "Skeleton",

  props: {
    type: {
      default: "list",
      type: String,
    },
  },
};
</script>
