<template>
  <v-app id="inspire">
    <v-app-bar app clipped-right color="blue-grey" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Toolbar</v-toolbar-title>
      <v-spacer></v-spacer>
      <div class="text-center">
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
    </div>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app>
      <v-list dense>
        <v-list-item @click.stop="counter += 1">
          <v-list-item-action><v-icon>exit_to_app</v-icon></v-list-item-action>
          <v-list-item-content><v-list-item-title>Clicks++</v-list-item-title></v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-content>
      <v-container fluid fill-height>
        <v-layout justify-center align-center>
          <v-flex>
            <span>Clicks: {{counter}}</span>
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
export default {
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
}
</script>

<style>

</style>