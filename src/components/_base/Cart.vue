<template>
  <b-row class="pad-top-10 overall-cart">
    <b-col class="card-cart" cols="12" sm="12" md="12" lg="12" xl="12">
      <b-col cols="12" sm="12" md="12" lg="12" xl="12" v-for="(item, index) in cart" :key="index">
        <b-card no-body class="overflow-hidden mb-3" style="max-width: 540px;">
          <b-row no-gutters>
            <b-col md="3">
              <b-card-img
                src="https://picsum.photos/400/400/?image=20"
                alt="Image"
                class="rounded-0"
              ></b-card-img>
            </b-col>
            <b-col md="9">
              <b-container class="bv-example-row">
                <b-row>
                  <b-col class="mar-top-10">
                    <h5>{{ item.product.product_name }}</h5>
                  </b-col>
                  <b-col></b-col>
                  <div class="w-100 mar-top-10"></div>
                  <b-col>
                    <b-button-group>
                      <b-button type="button" md="4" variant="primary" @click="decrement(item)">-</b-button>
                      <!-- <input type="text" class="input-text" placeholder="0" /> -->
                      <input type="text" class="input-text" :value="item.quantity" />
                      <b-button type="button" md="4" variant="primary" @click="increment(item)">+</b-button>
                    </b-button-group>
                  </b-col>
                  <b-col>
                    <h5>Rp. {{ item.product.product_price * item.quantity }}</h5>
                  </b-col>
                </b-row>
              </b-container>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
      <div v-if="removeFromCart = true">
        <div class="height-cart"></div>
        <b-row align-h="between">
          <b-col cols="3">
            <h5>Total :</h5>
          </b-col>
          <b-col cols="4">
            <h5>Rp. 50000*</h5>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="12">
            <h6>*Belum termasuk PPn</h6>
          </b-col>
        </b-row>
        <b-button block variant="primary">Checkout</b-button>
        <b-button block variant="danger">Cancel</b-button>
      </div>
    </b-col>
  </b-row>
</template>

<script>
export default {
  name: 'Cart',
  props: ['name', 'price', 'count', 'cart'],
  methods: {
    increment(data) {
      console.log('Clicked')
      this.$emit('increment', data)
    },
    decrement(data) {
      this.$emit('decrement', data)
    },
    priceProduct() {
      this.priceProduct = this.price * this.count
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

.height-cart {
  height: 300px;
}

.card-cart {
  height: 780px;
  overflow-y: scroll;
}

.card-cart::-webkit-scrollbar {
  display: none;
}
</style>
