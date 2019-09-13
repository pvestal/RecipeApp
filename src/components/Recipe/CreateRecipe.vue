<template>
  <v-container>
    <v-layout row v-if="error">
      <v-flex xs12 sm6 offset-sm3>
        <app-alert @dismissed="onDismissed" :text="error.message"></app-alert>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <h4>Add Recipe</h4>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12>
        <form @submit.prevent="onAddRecipe">
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                name="title"
                label="Title"
                id="title"
                v-model="title"
                required></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                name="category"
                label="Category"
                id="category"
                v-model="category"
                required></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-btn raised class="primary" @click="onPickFile">Upload Image</v-btn>
              <input type="file" v-show="false" ref="fileInput" accept="image/*" @change="onFilePicked">

            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <img :src="imageUrl" height="150">
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-textarea
                name="description"
                label="Description"
                id="description"
                v-model="description"
                required></v-textarea>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <h4>Choose a Date</h4>
            </v-flex>
          </v-layout>
          <v-layout row class="mb-2">
            <v-flex xs12 sm6 offset-sm3>
              <v-date-picker v-model="date"></v-date-picker>
            </v-flex>
          </v-layout>
          <!-- <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-time-picker v-model="time" format="24hr"></v-time-picker>
            </v-flex>
          </v-layout> -->
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-btn
                class="primary"
                :disabled="!formIsValid && loading" :loading="loading"
                type="submit">Add Recipe<span slot="loader" class="custom-loader">
                  <v-icon light>cached</v-icon>
                      </span></v-btn>
            </v-flex>
          </v-layout>
        </form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data() {
      return {
        title: '',
        category: '',
        imageUrl: '',
        description: '',
        date: new Date().toISOString().substr(0, 10),
        image: null
      }
    },
    computed: {
      formIsValid() {
        return this.title !== '' && this.category !== '' && this.imageUrl !== '' 
        && this.description !== ''
      },
      error() {
        return this.$store.getters.error
      },
      loading() {
        return this.$store.getters.loading
      }
    },
    methods: {
      onAddRecipe() {
        if(!this.formIsValid) {
          return 
        }
        if(!this.image) {
          return
        }
        const recipeData = {
          title: this.title,
          category: this.category,
          image: this.image,
          description: this.description,
          date: this.date
        }
        this.$store.dispatch('addRecipe', recipeData)
        this.$router.push('/recipes')
      },
      onDismissed() {
        this.$store.dispatch('CLEAR_ERROR')
      },
      onPickFile() {
        this.$refs.fileInput.click()
      },
      onFilePicked(event) {
        const files = event.target.files
        let fileName = files[0].name
        //make sure it has an extension
        if (fileName.lastIndexOf('.') <= 0) {
          return alert("Please add a valid file.")
        }
        //turn into base-64 string value
        const fileReader = new FileReader()
        fileReader.addEventListener('load', () => {
          this.imageUrl = fileReader.result
        })
        fileReader.readAsDataURL(files[0])
        this.image = files[0]
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