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
    <div style="padding: 0 16px 0 16px; flex:1" class="mt-5">
      <div class="text-subtitle-1">Blocked Trackers</div>
      <div class="text-h2 d-flex flex-row-reverse align-center">
        {{ trackers.length }}
      </div>
      <div class="text-subtitle-1 d-flex flex-row-reverse align-center">
        Total: {{ requests.length }} | Blocked: {{ trackers.filter((x) => x.blocked).length }}
      </div>
    </div>
    <v-divider></v-divider>
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
              v-text="item.title + ' (' + trackers.length + ')'"
            ></v-list-item-title>
          </v-list-item-content>
        </template>
        <div v-if="requests.length >= 1">
          <v-list-item v-for="child in trackers" :key="child.title">
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
      browser.storage.local.get("info").then((data) => {
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
      return this.requests == null
        ? []
        : this.requests
            .filter((x) => x.blocked)
            .map((x) => new URL(x.url).hostname)
            .filter((v, i, a) => a.indexOf(v) === i)
            .map((x) => ({
              title: x,
            }));
    },
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
};
</script>
