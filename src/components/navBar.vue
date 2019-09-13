<template>
  <v-app id="inspire">
    <v-app-bar app clipped-right color="blue" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <router-link to="/" >
        <v-toolbar-title class="white--text">Recipe WebApp</v-toolbar-title>
      </router-link>
      <v-spacer></v-spacer>
      <span v-if="user">Welcome {{user.displayName}}</span>
      <v-btn v-else @click.prevent="googleSignIn" class="primary">Google Sign In</v-btn>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app>
      <v-list dense>
        <v-list-item v-for="item in navItems" :key="item.id" :to="item.link">
          <v-list-item-action><v-icon>{{item.icon}}</v-icon></v-list-item-action>
          <v-list-item-content><v-list-item-title>{{item.title}}</v-list-item-title></v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <router-view></router-view>
  </v-app>
</template>

<script>

export default {
  data: () => ({
    drawer: false,
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
      navItems() {
        let navItems = [
            { icon: 'face', title: 'Sign up', link: 'signup' },
            { icon: 'lock_open', title: 'Sign in', link: 'signin' }
        ]
        if (this.user) {
            navItems = [
                { icon: 'list', title: 'View Recipes', link: '/recipes' },
                { icon: 'note_add', title: 'Add Recipe', link: '/recipe/new' },
                { icon: 'person', title: 'Profile', link: '/profile' }
            ]
        }
        return navItems
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