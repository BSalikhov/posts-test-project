<template>
  <v-app class="mx-4">
    <router-view />
    <notifications position="top right" classes="notification" />
  </v-app>
</template>

<script>
export default {
  name: "App",
};
</script>
