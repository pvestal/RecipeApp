import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase/app'
import 'firebase/auth'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null
  },
  mutations: {
    SET_USER (state, payload) {
      state.user = payload
    },
  },
  actions: {
    googleSignIn({commit}) {
      commit('SET_LOADING', true)
      let user = null
      let provider = new firebase.auth.GoogleAuthProvider()
      //https://developers.google.com/identity/protocols/googlescopes#oauth2v2
      provider.addScope("https://www.googleapis.com/auth/userinfo.email")
      provider.addScope("https://www.googleapis.com/auth/userinfo.profile")
      firebase.auth().signInWithPopup(provider)
      .then(googleData => {
        user = googleData.user
        const googleUser = {
          uid: user.uid, 
          displayName: user.displayName, 
          email: user.email,
          photoURL: user.photoURL,
          created: user.metadata.creationTime,
          lastSignIn: user.metadata.lastSignInTime,
        }
        firebase.database().ref('users').child(user.uid).set(googleUser)
        commit('SET_USER', googleUser)
      })
      .catch(error => console.log(error))
    },
  }
})
