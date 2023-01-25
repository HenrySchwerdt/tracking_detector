<template>
  <div class="secondary">
    <div
      class="d-flex flex-row align-center mt-5"
      style="padding: 0 16px 0 16px"
    >
      <img
        :src="faviconUrl"
        alt="logo"
        height="40px"
        style="margin-right: 10px"
      />
      <div class="text-h5">{{ url || "test" }}</div>
    </div>
    <div style="padding: 0 16px 0 16px" class="mt-5">
      <div class="text-subtitle-1">Blocked Trackers</div>
      <div class="text-h2 d-flex flex-row-reverse align-center">{{ trackers.length }}</div>
    </div>
    <v-list color="secondary">
      <v-list-group
        v-for="item in items"
        :key="item.title"
        v-model="item.active"
        no-action
      >
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title v-text="item.title + ' ('+ trackers.length + ')'"></v-list-item-title>
          </v-list-item-content>
        </template>

        <v-list-item v-for="child in trackers" :key="child.title">
          <v-list-item-content>
            <v-list-item-title v-text="child.title"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-group>
    </v-list>
    <v-divider></v-divider>
  </div>
</template>
<script>
export default {
  props: ["requests"],
  data: () => ({
    url: undefined,
    faviconUrl: undefined,
    timer: null,
    items: [
      {
        items: [{ title: "tracker1" }],
        title: "Trackers",
      },
    ],
  }),
  mounted: function () {
    this.timer = setInterval(() => {
      chrome.storage.local.get(["info"], (data) => {
        if (this.faviconUrl != data.info.favIconUrl) {
          this.faviconUrl = data.info.favIconUrl;
        }
        if (this.url != new URL(data.info.url).hostname) {
          this.url = new URL(data.info.url).hostname;
        }
      });
      this.items[0].items = this.props.requests;
    }, 200);
  },
  computed: {
    trackers: function () {
      return this.requests
        .filter((x) => x.blocked)
        .map((x) => new URL(x.url).hostname)
        .filter((v, i, a) => a.indexOf(v) === i)
        .map((x) => ({
          title: x
        })) || [];
    },
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
};
</script>
