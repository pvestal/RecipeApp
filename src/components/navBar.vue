<template>
  <v-app id="inspire">
    <v-app-bar app clipped-right color="blue-grey" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <router-link to="/" >
          <v-toolbar-title>
          Recipe WebApp
        </v-toolbar-title>
      </router-link>
      
      <v-spacer></v-spacer>
      <span v-if="user" left>Welcome {{user.displayName}}</span>
      <v-btn v-else @click.prevent="googleSignIn" class="primary">Google Sign In</v-btn>
      <!-- <div class="text-center">
      <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-btn color="primary" dark v-on="on">
            MENU
          </v-btn>
        </template>
        <v-list>
          <v-list-item v-for="(item, index) in items" :key="index" @click="" :to="item.route">
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </div> -->
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app>
      <v-list dense>
        <v-list-item @click.stop="counter += 1">
          <v-list-item-action><v-icon>exit_to_app</v-icon></v-list-item-action>
          <v-list-item-content><v-list-item-title>Clicks++</v-list-item-title></v-list-item-content>
        </v-list-item>
        <span>Clicks: {{counter}}</span> 
      </v-list>
    </v-navigation-drawer>
    
    <v-content>
      <v-container fluid>
        <v-layout>
          <v-flex>
            
            <recipes />
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
    <v-footer app color="blue-grey" class="white--text">
      <span>Vuetify</span>
      <v-spacer></v-spacer>
      <span>&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
import recipes from './recipes'
export default {
  components: {recipes},
  data: () => ({
    drawer: false,
    left: false,
    counter: 0,
    items: [
      {title: 'Sign In', route: 'SignIn'},
      {title: 'Add Recipe', route: 'addRecipe'},
      {title: 'Sign Out', route: 'SignOut'},
    ],
  }),
  methods: {
      googleSignIn() {
        this.$store.dispatch('googleSignIn')
      },
  },
    computed: {
      user() {
        return this.$store.getters.user
      },
    },
    // watch: {
    //   user (value) {
    //     if (value !== null && value !== undefined) {
    //       this.$router.push('/profile')
    //     }
    //   }
    // },
}
</script>

<style>

</style>