<template>
  <div>
    <h1>Working on chunk: {{ this.$route.params.id }}</h1>
    <br />
    <br />
    <v-card>
      <v-progress-linear :value="currentIndex"></v-progress-linear>
      <div class="pa-3">
        <h3>Progress: {{ currentIndex }} / {{ requests.length }}</h3>
        <br />
        <v-chip
          small
          class="mt-2 mb-2"
          :color="
            chipLabel == 'Unlabeled'
              ? ''
              : chipLabel == 'Tracker'
              ? 'red'
              : 'green'
          "
          >{{ chipLabel }}</v-chip
        >
        <json-viewer
          :value="requests[currentIndex]"
          copyable
          boxed
          expanded
          sort
        ></json-viewer>
        <br />
        <div class="d-flex flex-row justify-space-between" style="width: 100%">
          <v-btn text :disabled="currentIndex <= 0" @click="previous()"
            >Previous</v-btn
          >
          <div>
            <v-btn text color="red" @click="label(true)">Tracker</v-btn>
            <v-btn text color="green" @click="label(false)">
              Non-Tracker
            </v-btn>
          </div>
          <v-btn
            text
            :disabled="currentIndex >= requests.length"
            @click="next()"
            >Next</v-btn
          >
        </div>
      </div>
    </v-card>
    <div class="d-flex flex-row-reverse align-center mt-3">
      <v-btn @click="save()">Save</v-btn>
      <p class="ml-3 mr-3">
        Labeled : ({{ Object.keys(labels).length }}/{{ requests.length }})
      </p>
    </div>
  </div>
</template>
<script>
export default {
  data: () => ({
    requests: [],
    currentIndex: 0,
    labels: {},
    timer: undefined,
  }),
  mounted: function () {
    this.timer = setInterval(() => {
      browser.storage.local.get(this.$route.params.id).then((data) => {
        if (this.requests.length < data[this.$route.params.id].length)
          this.requests = data[this.$route.params.id];
      });
    }, 200);
    browser.storage.local
      .get(this.$route.params.id + "_labels")
      .then((data) => {
        if (data == null || data[this.$route.params.id + "_labels"] == null) {
          return;
        }
        this.labels = data[this.$route.params.id + "_labels"];
      });
  },
  methods: {
    save() {
      let obj = {};
      obj[this.$route.params.id + "_labels"] = this.labels;
      browser.storage.local.set(obj);
    },
    next() {
      this.currentIndex += 1;
      this.requests = JSON.parse(JSON.stringify(this.requests));
    },
    previous() {
      this.currentIndex -= 1;
      this.requests = JSON.parse(JSON.stringify(this.requests));
    },
    label(value) {
      let labelsCpy = JSON.parse(JSON.stringify(this.labels));
      labelsCpy[this.requests[this.currentIndex].requestId] = value;
      this.labels = labelsCpy;
    },
    chipLabel() {
      if (this.requests[this.currentIndex]) {
        if (this.labels[this.requests[this.currentIndex].requestId] == null) {
          return "Unlabeled";
        }
        return this.labels[this.requests[this.currentIndex].requestId]
          ? "Tracker"
          : "Non-Tracker";
      }
      return "Unlabeled";
    },
  },
  computed: {
    chipLabel: function () {
      if (this.requests[this.currentIndex]) {
        if (this.labels[this.requests[this.currentIndex].requestId] == null) {
          return "Unlabeled";
        }
        return this.labels[this.requests[this.currentIndex].requestId]
          ? "Tracker"
          : "Non-Tracker";
      }
      return "Unlabeled";
    },
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
};
</script>
