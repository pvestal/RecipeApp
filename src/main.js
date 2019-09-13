import Vue from 'vue'
import App from './App.vue'
import router from './router'
import {store} from './store'
import vuetify from './plugins/vuetify';
import firebase from 'firebase/app'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
  created() {
    const firebaseConfig = {
      apiKey: "AIzaSyD7qRhNGU_PRn2BB2po-eiGWUxyJE1IOdY",
      authDomain: "this-recipe.firebaseapp.com",
      databaseURL: "https://this-recipe.firebaseio.com",
      projectId: "this-recipe",
      storageBucket: "this-recipe.appspot.com",
      messagingSenderId: "51908066399",
      appId: "1:51908066399:web:8934f174e2c70454a1afea"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    //load recipes from firebase
    this.$store.dispatch('loadedRecipes')
  }
}).$mount('#app')
