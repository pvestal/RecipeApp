import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    loadedRecipes: [
      {id: '8jh287asd', title: 'Spaetzle', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3Shlb-f3zX2Hkj5zeX4v-OFbvutN5HeNMBCTETmMTUJodjbu1', 
      description: 'German Noodle', category: 'something'},
      {id: 'asd98adaa', title: 'Spaetzle2', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3Shlb-f3zX2Hkj5zeX4v-OFbvutN5HeNMBCTETmMTUJodjbu1', 
      description: 'German Noodle2', category: 'something2'},
      {id: '987adaddf', title: 'Spaetzle3', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3Shlb-f3zX2Hkj5zeX4v-OFbvutN5HeNMBCTETmMTUJodjbu1', 
      description: 'German Noodle3', category: 'something3'},
    ],
    user: null,
    loading: false,
    error: null
  },
  mutations: {
    PUSH_RECIPE(state, payload) {
      state.loadedRecipes.push(payload)
    },
    SET_LOADED_RECIPES(state, payload){
      state.loadedRecipes = payload
    },
    SET_USER(state, payload) {
      state.user = payload
    },
    SET_LOADING(state, payload) {
      state.loading = payload
    },
    SET_ERROR(state, payload) {
      state.error = payload
    },
    CLEAR_ERROR(state) {
      state.error = null
    }
  },
  actions: {
    loadedRecipes({commit}) {
      commit('SET_LOADING', true)
      firebase.firestore().collection('recipes').get()
      .then((querySnapshot) => {
        let recipesArray = []
        querySnapshot.forEach((doc) => {
        let recipe = doc.data()
            recipe.id = doc.id
            recipesArray.push(recipe)
        })
        store.commit('SET_LOADED_RECIPES', recipesArray)
        commit('SET_LOADING', false)
      })
      .catch((error) => {
        console.log(error)
        commit('SET_LOADING', true)
      })
    },
    createRecipe({commit, getters}, payload) {
      commit('SET_LOADING', true)
      //we could also just pass payload
      const recipe = {
        title: payload.title,
        category: payload.category,
        //imageUrl: payload.imageUrl,
        description: payload.description,
        date: payload.date,
        creatorId: getters.user.id
      }
      let imageUrl 
      let id
      
      //Reach out to Firebase and store
      firebase.firestore().collection('recipes').add(recipe)
      .then((data) => {
        //console.log(data)
        id = data.id
        return id
      })
      .then(id => {
        const fileName = payload.image.name
        const ext = fileName.slice(fileName.lastIndexOf('.'))
        //put the raw image file into firebase storage
        return firebase.storage().ref('recipes/' + id + '.' + ext).put(payload.image)
      })
      .then(fileData => {
        //return promise to save to firebase
        return fileData.ref.getDownloadURL()
      })
      .then(imageUrl => {
        //update firestore to include imageUrl
        return firebase.firestore().collection('recipes').doc(id).update({imageUrl:imageUrl})
      })
      .then(() => {
        commit('PUSH_RECIPE', {
        ...recipe,
        imageUrl: imageUrl,
        id: id
        })
        commit('SET_LOADING', false)
      })
      .catch((error) => {
        console.log(error)
      })
    },
    googleSignIn({commit}) {
      // commit('SET_LOADING', true)
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
        firebase.firestore().collection('users').doc(user.uid).set(googleUser)
        commit('SET_USER', googleUser)
      })
      .catch(error => console.log(error))
    },
    signUserUp({commit}, payload) {
      commit('SET_LOADING', true)
      commit('CLEAR_ERROR')
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
      .then( user => {
        commit('SET_LOADING', false)
        const newUser = {
          id: user.uid,
          // registeredrecipes: []
        }
        commit('SET_USER', newUser)
      })
      .catch(err => {
        commit('SET_LOADING', false)
        commit('SET_ERROR', err)
      })
    },
    signUserIn({commit}, payload) {
      commit('SET_LOADING', true)
      commit('CLEAR_ERROR')
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
      .then( user => {
        commit('SET_LOADING', false)
        const newUser = {
          id: user.uid,
          // registeredrecipes: []
        }
        commit('SET_USER', newUser)
      })
      .catch(err => {
        commit('SET_LOADING', false)
        commit('SET_ERROR', err)
      })
    },
    clearError({commit}) {
      commit('CLEAR_ERROR')
    },
    autoSignIn({commit}, payload) {
      commit('SET_USER', {id: payload.uid, registeredrecipes: []})
    },
    signOut({commit}) {
      firebase.auth().signOut()
      commit('SET_USER', null)
    }
  },
  getters: {
    loadedRecipes(state) {
      return state.loadedRecipes
      // return state.loadedRecipes.sort((recipeA, recipeB) => {
      //   return recipeA.date > recipeB.date
      // })
    },
    featuredRecipes(state, getters) {
      return getters.loadedRecipes.slice(0,5)
    },
    loadedRecipe(state) {
      return (recipeId) => {
        return state.loadedRecipes.find((recipe) => {
          return recipe.id === recipeId
        })
      }
    },
    user(state) {
      return state.user
    },
    loading(state) {
      return state.loading
    },
    error(state) {
      return state.error
    }
  }
})
