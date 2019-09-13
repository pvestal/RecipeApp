// <template>
//   <v-container>
//     <v-layout row wrap>
//       <v-flex xs12 sm6 class="text-xs-center text-sm-right">
//         <v-btn large router to="/recipes" class="info">Explore recipes</v-btn>
//       </v-flex>
//       <v-flex xs12 sm6 class="text-xs-center text-sm-left">
//         <v-btn large router to="/recipe/new" class="info">Add recipe</v-btn>
//       </v-flex>
//     </v-layout>
//     <v-layout>
//       <v-flex xs12 class="text-xs-center">
//         <v-progress-circular v-if="loading" indeterminate class="primary--text" :width="7" :size="70"></v-progress-circular>
//       </v-flex>
//     </v-layout>
//     <v-layout row wrap class="mt-2" v-if="!loading">
//       <v-flex xs12>
//         <v-carousel style="cursor: pointer">
//           <v-carousel-item
//             v-for="recipe in recipes"
//             :key="recipe.id"
//             :src="recipe.imageUrl"
//             @click="onLoadRecipe(recipe.id)">
//             <div class="title">
//               {{recipe.title}}
//             </div>
//           </v-carousel-item>
//         </v-carousel>
//       </v-flex>
//     </v-layout>
//     <v-layout row wrap class="mt-2">
//       <v-flex xs12 class="text-xs-center">
//         <p>Like Recipe</p>
//       </v-flex>
//     </v-layout>
//   </v-container>
// </template>

// <script>
//   export default {
//     computed:{
//       recipes() {
//         return this.$store.getters.featuredRecipes
//       },
//       loading() {
//         return this.$store.getters.loading
//       }
//     },
//     methods: {
//       onLoadRecipe(id) {
//         this.$router.push('/recipes/' + id)
//       }
//     }
//   }
// </script>

// <style scoped>
// .title {
//   position: absolute;
//   bottom: 50px;
//   background-color: rgba(0,0,0,.5);
//   color: white;
//   font-size: 2em;
//   padding: 20px;
// }
// </style>
