<template>
  <div>
    <v-list color="secondary">
      <v-list-group
        v-for="item in items"
        :key="item.title"
        v-model="item.active"
        no-action
      >
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title
              v-text="item.title + ' (' + blockedRequests.length + ')'"
            ></v-list-item-title>
          </v-list-item-content>
        </template>
        <div v-if="requests.length >= 1">
          <v-list-item v-for="child in blockedRequests" :key="child.title">
            <v-list-item-content>
              <v-list-item-title v-text="child.title"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </div>
      </v-list-group>
    </v-list>
    <v-divider></v-divider>
  </div>
</template>
<script>
export default {
  props: ["requests"],
  data: () => ({
    timer: null,
    items: [
      {
        title: "Tracking Requests",
      },
    ],
  }),
  computed: {
    blockedRequests: function () {
      return this.requests == null
        ? []
        : this.requests
            .filter((x) => x.blocked)
            .map((x) => ({
              title: x.url,
            }));
    },
  },
};
</script>
