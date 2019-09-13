<template>
  <v-container>
    <v-layout row wrap v-for="recipe in recipes" :key="recipe.id" class="mb-2">
      <v-flex xs12 sm10 md8 offset-sm1 offset-md2>
        <v-card class="info">
          <v-container fluid>
            <v-layout row>
              <v-flex xs5 sm4 md3>
                <v-img :src="recipe.imageUrl" height="125px"></v-img>
              </v-flex>
              <v-flex xs7 sm8 md9>
                <v-card-title>
                  <div>
                  <h5 class="white--text mb-0">{{recipe.title}}</h5>
                  <div>{{recipe.category}}</div>
                  <div>{{recipe.description}}</div>
                  </div>
                </v-card-title>
                <v-card-actions>
                  <v-btn :to="'/recipes/' + recipe.id">
                    <v-icon left light>arrow_forward</v-icon>
                  View Recipe
                  </v-btn>
                </v-card-actions>
              </v-flex>
            </V-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    recipes: [
      {id: '8jh287asd', title: 'Title 1', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3Shlb-f3zX2Hkj5zeX4v-OFbvutN5HeNMBCTETmMTUJodjbu1', 
      description: 'Description 1', category: 'category 1'},
      {id: 'asd98adaa', title: 'Title 2', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3Shlb-f3zX2Hkj5zeX4v-OFbvutN5HeNMBCTETmMTUJodjbu1', 
      description: 'Description 2', category: 'category 2'},
      {id: '987adaddf', title: 'Title 3', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3Shlb-f3zX2Hkj5zeX4v-OFbvutN5HeNMBCTETmMTUJodjbu1', 
      description: 'Description 3', category: 'category 3'},
    ],
  }),
}
</script>

<style>

</style>