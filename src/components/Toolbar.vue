<template>
  <v-container>
    <v-row>
      <v-btn @click="$router.go(-1)" class="d-flex">
        <v-icon class="mr-2">mdi-arrow-left</v-icon>
        Back
      </v-btn>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Toolbar",
};
</script>
