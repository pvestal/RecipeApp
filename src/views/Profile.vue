<template>
  <div v-if="user">
      <p>Display Name: {{user.displayName}}</p>
      <p>User Id: {{user.uid}}</p>
      <p>User Email: {{user.email}}</p>
      <p>User PhotoUrl: {{user.photoURL}}</p>
      <v-img :src="user.photoURL" max-height="75" max-width="75" />
  </div>
</template>

<script>
export default {
  data: () => ({

  }),
  computed: {
    user() {
        return this.$store.getters.user
    }
  }
}
</script>

<style>

</style>