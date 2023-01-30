<template>
  <div>
    <v-list color="secondary">
      <v-list-group
        v-for="item in items"
        :key="item.title"
        v-model="item.active"
        no-action
        dense
      >
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title
              v-text="item.title + ' (' + blockedRequests.length + ')'"
            ></v-list-item-title>
          </v-list-item-content>
        </template>
        <div v-if="requests.length >= 1" v-for="child in blockedRequests" :key="child.title">
          <v-divider></v-divider>
          <v-list-item dense>
            <v-list-item-content style="width: 400px; margin: 0; padding: 20px 0 0 0; ">
              <p>{{ child.title }}</p>
              <p class="mt-2">{{  "frameId: " + child.frameId + " | method: " + child.method + " | type: " + child.type }}</p>
              <!-- <v-list-item-title v-text="child.title"></v-list-item-title> -->
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
              frameId: x.frameId,
              type: x.type,
              method: x.method,
            }));
    },
  },
};
</script>
