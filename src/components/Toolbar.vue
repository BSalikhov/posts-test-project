<template>
  <v-container>
    <v-row>
      <v-btn @click="$router.go(-1)" class="d-flex">
        <v-icon class="mr-2">mdi-arrow-left</v-icon>
        Back
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn
        @click="$emit('deletePost')"
        class="mr-2"
        text
        color="gray"
        outlined
        depressed
      >
        <v-icon class="mr-1" size="large">mdi-delete</v-icon>

        Delete

        <v-icon class="ml-1" v-if="loading" size="large"
          >fas fa-circle-notch fa-spin</v-icon
        >
      </v-btn>

      <v-btn @click="$emit('editPost')" color="primary" depressed>
        <v-icon class="mr-1" size="medium">mdi-pencil</v-icon>
        Edit
      </v-btn>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Toolbar",

  props: {
    loading: {
      required: true,
      type: Boolean,
    },
  },
};
</script>
