import Vue from "vue";
import vuetify from "./plugins/vuetify";
import App from "./App.vue";
import Home from "./pages/Home.vue";
import About from "./pages/About.vue";
import Labels from "./pages/Labels.vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);


const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About },
  { path: '/labels', component: Labels}
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
