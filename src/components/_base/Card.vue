<template>
  <div class="c-container">
    <h4>{{name}}</h4>
    <p>{{price}}</p>
    <button type="button" @click="increment()">Add to Cart</button>
  </div>
</template>

<script>
export default {
  name: 'Card',
  props: ['name', 'price'],
  methods: {
    increment() {
      console.log('Clicked')
      this.$emit('increment', 1)
    }
  }
}
</script>

<style scoped>
.c-container {
  height: 200px;
  width: 150px;
  border-radius: 5px;
  border: 1px solid black;
}
</style>
