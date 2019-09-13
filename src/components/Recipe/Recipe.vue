<template>
    <v-container>
        <v-layout row wrap>
            <v-flex xs12>
                <v-card>
                    <v-card-title>
                        <h4 class="primary--text">{{recipe.title}}</h4>
                        <template v-if="userIsCreator">
                            <v-spacer></v-spacer>
                            <!-- <app-edit-meetupDialog></app-edit-meetupDialog> -->
                        </template>
                    </v-card-title>
                        <v-img :src="recipe.imageUrl" height="400px"></v-img>
                        <v-card-text>
                            <div class="info--text">{{recipe.category}}</div>
                            <div>{{recipe.description}}</div>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn class="primary">Like</v-btn>
                        </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
        props: ['id'],
        computed: {
            recipe() {
               return this.$store.getters.loadedRecipe(this.id)
            },
            userIsAuthenticated() {
                return this.$store.getters.user !== null && this.$store.getters.user !== undefined
            },
            userIsCreator() {
                if (!this.userIsAuthenticated) {
                    return false
                }
                return this.$store.getters.user.id === this.recipe.creatorId
            }
        }
    }
</script>
