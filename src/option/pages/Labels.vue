<template>
  <div>
    <br />
    <h1>Labels</h1>
    <br />
    <p class="text-subtitle-1 blocksatz">
      Here you can find a request history of your most recent requests which are
      chuncked in sets of hundret. You can manually label them and send them to
      our backend.
    </p>
    <v-list dense nav>
      <v-list-item
        v-for="item in chunkIds"
        :key="item"
        link
        :to="'/labels/' + item"
      >
        <v-list-item-content>
          <v-list-item-title
            >Chunk: {{ item }} | Progress
            {{
              chunkProgress[item] == null ? "0" : chunkProgress[item]
            }}/100</v-list-item-title
          >
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <div class="d-flex flex-row-reverse mt-2">
        <v-btn>Submit ({{ Object.values(chunkProgress).reduce((a,b) => a + b) }} Entries)</v-btn>
    </div>
  </div>
</template>
<script lang="js">
export default {
  data: () => ({
    chunkIds: [],
    chunkProgress: {},
    timer: undefined,
  }),
  mounted: function () {
    this.timer = setInterval(() => {
      browser.storage.local.get("keys").then((data) => {
        this.chunkIds = data.keys;
        this.chunkIds.map(x => {
            browser.storage.local.get(x+"_labels").then((data) => {
                if (data == null || data[x+"_labels"] == null) {
                    return
                }
                let progress = Object.values(data[x+"_labels"]).length
                    let tmp = JSON.parse(JSON.stringify(this.chunkProgress))
                    tmp[x] = progress
                    this.chunkProgress = tmp
            })
        })
      });
    }, 200);
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
};
</script>
