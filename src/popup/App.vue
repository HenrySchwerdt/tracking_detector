<template>
  <div
    style="width: 400px; height: 453px; overflow-y: auto; overflow-x: hidden"
  >
    <v-app>
      <Header :requests="requests"></Header>
      <Controlls></Controlls>
      <Footer :requests="requests"></Footer>
    </v-app>
  </div>
</template>
<script>
import Header from "./components/Header.vue";
import Controlls from "./components/Controlls.vue";
import Footer from "./components/Footer.vue";

export default {
  data: () => ({
    requests: [],
    timer: undefined,
  }),
  mounted: function () {
    this.timer = setInterval(() => {
      browser.storage.local.get("requests").then((data) => {
        console.log(data)
        try {
          if (this.requests != null && this.requests.length < data.requests.length) {
          this.requests = data.requests;
        }
        } catch (e) {
          
        }
       
      });
    }, 200);
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
  components: {
    Header,
    Controlls,
    Footer,
  },
};
</script>
<style>
/* width */
::-webkit-scrollbar {
  width: 5px;
  border-radius: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #d0e7f1;
  border-radius: 10px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: rgb(171, 157, 250);
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: rgb(64, 115, 182);
}
</style>
