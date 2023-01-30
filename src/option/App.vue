<template>
  <v-app>
    <v-app-bar
      color="white"
      app
      flat
      dense
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app>
    <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            Tracking Detector
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list
        dense
        nav
      >
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link

          :to="item.to"
        >
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- Sizes your content based upon application components -->
    <v-main>
      <!-- Provides the application the proper gutter -->
      <v-container>
        <!-- If using vue-router -->
        <router-view></router-view>

      </v-container>
    </v-main>
  </v-app>
</template>
<script>
  export default {
    data () {
      return {
        drawer: true,
        items: [
          { title: 'Home', to: "/" },
          { title: 'Labels', to: '/labels' },
          { title: 'About', to: '/about' },
        ],
        right: null,
      }
    },
  }
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
