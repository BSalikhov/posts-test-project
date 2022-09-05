<template>
  <v-container class="my-5">
    <v-row v-if="!$route.params.id" align="center" justify="space-between">
      <h1>Posts List</h1>

      <v-btn to="/posts/create" depressed color="primary"> Add Post </v-btn>
    </v-row>

    <v-row v-else>
      <v-row dense>
        <v-img
          class="rounded-circle mr-4"
          lazy-src="@/assets/loader.gif"
          :src="`https://source.unsplash.com/random/200x200?sig=${post?.userId}`"
          max-height="50"
          max-width="50"
          alt="user avatar"
        />
        <div>
          <h3>User: {{ post?.userId }}</h3>
          <p class="text-body-2 text-md-body-1">Apr 13, 20:00</p>
        </div>
      </v-row>

      <v-spacer></v-spacer>

      <div class="d-sm-none">
        <Dropdown>
          <template #default>
            <v-list-item v-for="item in dropdownItems" :key="item.id">
              <v-list-item-title @click="$emit(item.action)">{{
                item.title
              }}</v-list-item-title>
            </v-list-item>
          </template>
        </Dropdown>
      </div>

      <div class="d-none d-sm-block">
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
        </v-btn>

        <v-btn @click="$emit('editPost')" color="primary" depressed>
          <v-icon class="mr-1" size="medium">mdi-pencil</v-icon>
          Edit
        </v-btn>
      </div>
    </v-row>
  </v-container>
</template>

<script>
import Dropdown from "./Dropdown";

export default {
  name: "Toolbar",

  components: {
    Dropdown,
  },

  data: () => ({
    dropdownItems: [
      {
        id: 0,
        title: "Delete",
        action: "deletePost",
      },
      {
        id: 1,
        title: "Edit",
        action: "editPost",
      },
    ],
  }),

  props: {
    post: {
      type: Object,
      default: () => {},
    },
  },
};
</script>
