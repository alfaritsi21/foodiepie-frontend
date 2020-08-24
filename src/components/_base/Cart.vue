<template>
  <b-card no-body class="overflow-hidden" style="max-width: 540px;">
    <b-row no-gutters>
      <b-col md="3">
        <b-card-img
          src="https://picsum.photos/400/400/?image=20"
          alt="Image"
          class="rounded-0"
        ></b-card-img>
      </b-col>
      <b-col md="9">
        <b-container class="bv-example-row" @increment="incrementCount">
          <b-row>
            <b-col class="mar-top-10">
              <h4>{{ name }}</h4>
            </b-col>
            <b-col></b-col>
            <div class="w-100 mar-top-10"></div>
            <b-col>
              <b-button-group>
                <b-button type="button" md="4" variant="primary">-</b-button>
                <!-- <input type="text" class="input-text" placeholder="0" /> -->
                <input
                  type="text"
                  class="input-text"
                  placeholder="0"
                  :value="count"
                />
                <b-button
                  type="button"
                  md="4"
                  variant="primary"
                  @click="increment()"
                  >+</b-button
                >
              </b-button-group>
            </b-col>
            <b-col>
              <h5>Rp. {{ price }}</h5>
              <p>{{ count }}</p>
            </b-col>
          </b-row>
        </b-container>
      </b-col>
    </b-row>
  </b-card>
</template>

<script>
export default {
  name: 'Cart',
  data() {
    return {
      count: 0
    }
  },
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
.input-text {
  width: 40px;
  text-align: center;
}

.box {
  width: 40px;
  height: auto;
  border: 1px solid black;
}
</style>
