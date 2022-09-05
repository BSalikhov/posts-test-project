<template>
  <v-menu left offset-y>
    <template v-slot:activator="{ on, attrs }">
      <v-btn icon v-bind="attrs" v-on="on">
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </template>

    <v-list>
      <slot name="default"> </slot>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  name: "Dropdown",
};
</script>

<style></style>
