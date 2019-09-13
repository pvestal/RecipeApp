import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home.vue'
import Recipes from '@/components/Recipe/Recipes.vue'
import CreateRecipe from '@/components/Recipe/CreateRecipe.vue'
import Recipe from '@/components/Recipe/Recipe.vue'
import Profile from './views/Profile'
// import Signup from '@/components/User/Signup.vue'
// import Signin from '@/components/User/Signin.vue'
import AuthGuard from './auth-guard.js'


Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/recipes',
      name: 'Recipes',
      component: Recipes
    },
    {
      path: '/recipe/new',
      name: 'CreateRecipe',
      component: CreateRecipe,
      // beforeEnter: AuthGuard
    },
    {
      path: '/recipes/:id',
      props: true,
      name: 'Recipe',
      component: Recipe
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
      beforeEnter: AuthGuard
    },
    // {
    //   path: '/signup',
    //   name: 'Signup',
    //   component: Signup
    // },
    // {
    //   path: '/signin',
    //   name: 'Signin',
    //   component: Signin
    // }
    
  ]
  
})