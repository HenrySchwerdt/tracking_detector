<template>
  <div>
    <div style="padding: 0 16px 0 16px">
      <div class="d-flex flex-row align-center justify-space-between mt-3">
        <div class="text-subtitle-1">Blocking is active</div>
        <v-switch
          v-model="settings.active"
          color="primary"
          style="height: 30px"
          @change="onSettingsChanged"
        ></v-switch>
      </div>
      <div class="mt-3">
        <div class="text-subtitle-1">Blocking sensitivity</div>
        <v-slider
          v-model="settings.rate"
          :min="0"
          :max="100"
          class="align-center mt-3"
          @change="onSettingsChanged"
        >
          <template v-slot:append>
            <p>{{ settings.rate / 100 }}</p>
          </template>
        </v-slider>
      </div>
    </div>
    <v-divider></v-divider>
  </div>
</template>
<script>
export default {
  data: () => ({
    settings: {
      active: true,
      rate: 80,
    },
  }),
  mounted: function () {
    browser.storage.local.get("settings").then((data) => {
      if (data == undefined) {
        return;
      } else {
        this.settings = {
          active: data.settings.active,
          rate: data.settings.rate * 100,
        };
      }
    });
  },
  methods: {
    onSettingsChanged() {
      browser.storage.local.set({
        settings: {
          active: this.settings.active,
          rate: this.settings.rate / 100,
        },
      });
    },
  },
};
</script>
