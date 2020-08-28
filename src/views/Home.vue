<template>
  <div class="home">
    <!-- <Navbar /> -->
    <MainContent />
  </div>
</template>

<script>
// @ is an alias to /src
// import Navbar from '@/components/_base/Navbar.vue'
import MainContent from '@/components/MainContent.vue'

export default {
  name: 'Home',
  components: {
    // Navbar,
    MainContent
  }
}
</script>
