<template>
  <div class="history">
    <MainHistory />
  </div>
</template>

<script>
// @ is an alias to /src
// import NavbarHistory from '@/components/_base/NavbarHistory.vue'
import MainHistory from '@/components/MainHistory.vue'

export default {
  name: 'History',
  components: {
    MainHistory
  }
}
</script>
