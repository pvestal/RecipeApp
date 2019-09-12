<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <v-card v-if="!authUser">
          <v-card-text>
            <v-container>
              <form @submit.prevent="onSignIn">
                <span>Welcome Back</span>
                <v-layout row>
                  <v-flex xs12>
                    <img src="@/assets/btn_google_signin_light_focus_web.png" @click="googleSignIn" />
                  </v-flex>
                </v-layout>
              </form>
            </v-container>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
// import firebase from 'firebase/app'
// import 'firebase/auth'
  export default {
    data() {
      return {
        authUser: null,
        displayName: '',
        photoUrl: '',
        errorMsg: '',
      }
    },
    computed: {
      user() {
        return this.$store.getters.user
      },
    },
    watch: {
      user (value) {
        if (value !== null && value !== undefined) {
          this.$router.push('/profile')
        }
      }
    },
    methods: {
      googleSignIn() {
        this.$store.dispatch('googleSignIn')
      },
      googleSignOut() {
        this.$store.dispatch('googleSignOut')
      }
    }
  }
</script>

<style scoped>
  .custom-loader {
    animation: loader 1s infinite;
    display: flex;
  }
  @-moz-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-webkit-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-o-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>