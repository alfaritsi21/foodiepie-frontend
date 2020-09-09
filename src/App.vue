<template>
  <div id="app">
    <router-link to="/"></router-link>
    <router-link to="/history"></router-link>

    <router-view />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'App',
  methods: {
    ...mapActions(['interceptorRequest', 'interceptorResponse'])
  },
  created() {
    this.interceptorRequest()
    this.interceptorResponse()
  }
}
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
}
</style>
