import Vue from "vue";
import vuetify from "./plugins/vuetify";
import App from "./App.vue";
import Home from "./pages/Home.vue";
import About from "./pages/About.vue";
import Labels from "./pages/Labels.vue";
import Classifier from "./pages/Classifier.vue";
import VueRouter from "vue-router";
import JsonViewer from 'vue-json-viewer'
import 'vue-json-viewer/style.css'

Vue.use(VueRouter);
Vue.use(JsonViewer);


const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About },
  { path: '/labels', component: Labels},
  { path: '/labels/:id', component: Classifier}
]


const router = new VueRouter({
  base: "option/index.html",
  mode: 'history',
  fallback: true,
  routes,
})



new Vue({
  el: "#app",
  vuetify,
  router,
  render: (h) => h(App),
});
