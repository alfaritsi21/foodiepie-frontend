<template>
  <div>
    <div class="card-cart">
      <b-row class="pad-top-10 overall-cart">
        <b-col cols="12" sm="12" md="12" lg="12" xl="12">
          <b-col
            cols="12"
            sm="12"
            md="12"
            lg="12"
            xl="12"
            v-for="(item, index) in cart"
            :key="index"
          >
            <b-card
              no-body
              class="overflow-hidden mb-3"
              style="max-width: 540px;"
            >
              <b-row no-gutters>
                <b-col md="3">
                  <b-card-img
                    v-bind:src="urlApi + item.product.product_image"
                    alt="Image"
                    class="rounded-0"
                  ></b-card-img>
                </b-col>
                <b-col md="9">
                  <b-container class="bv-example-row">
                    <b-row>
                      <b-col cols="12" class="mar-top-10">
                        <h5>{{ item.product.product_name }}</h5>
                      </b-col>
                      <b-col></b-col>
                      <div class="w-100 mar-top-10"></div>
                      <b-col>
                        <b-button-group>
                          <b-button
                            type="button"
                            md="4"
                            variant="primary"
                            @click="decrement(item)"
                            >-</b-button
                          >
                          <!-- <input type="text" class="input-text" placeholder="0" /> -->
                          <input
                            type="text"
                            class="input-text"
                            :value="item.quantity"
                          />
                          <b-button
                            type="button"
                            md="4"
                            variant="primary"
                            @click="increment(item)"
                            >+</b-button
                          >
                        </b-button-group>
                      </b-col>
                      <b-col>
                        <h5>
                          Rp. {{ item.product.product_price * item.quantity }}
                        </h5>
                      </b-col>
                    </b-row>
                  </b-container>
                </b-col>
              </b-row>
            </b-card>
          </b-col>
          <div v-if="cart.length === 0" class="empty-cart">
            <img src="../../assets/food-and-restaurant.png" alt />
            <h4>Your cart is empty</h4>
            <h5>Please add some items from the menu</h5>
          </div>
        </b-col>
      </b-row>
    </div>
    <div v-if="cart.length > 0" class="mt-4">
      <b-row align-h="between">
        <b-col cols="3">
          <h5>Total:</h5>
        </b-col>
        <b-col cols="6">
          <h5>{{ formatCurrency(calculateTotalOrder()) }}*</h5>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="12">
          <h6>*Belum termasuk PPn</h6>
        </b-col>
      </b-row>
      <div>
        <b-button
          block
          variant="primary"
          id="show-btn"
          @click="
            $bvModal.show('bv-modal-example')
            confirmPayment()
          "
        >
          <b>Checkout</b>
        </b-button>
        <b-modal fluid id="bv-modal-example" hide-footer>
          <template v-slot:modal-title class="text-center">
            <h4>Checkout</h4>
          </template>
          <div class="d-block text-center">
            <b-row align-h="between">
              <b-col cols="6" class="text-left">
                <h6>Cashier : Pevita Pearce</h6>
              </b-col>
              <b-col cols="6" class="text-right">
                <h6>Receipt no: #{{ historyData.invoice }}</h6>
              </b-col>
            </b-row>
            <b-row
              v-for="(item, index) in cart"
              :key="index"
              align-h="between"
              class="mt-3"
            >
              <b-col cols="6" class="text-left">
                <h6>{{ item.product.product_name }} x{{ item.quantity }}</h6>
              </b-col>
              <b-col cols="6" class="text-right">
                <h6>{{ formatCurrency(item.product.product_price) }}</h6>
              </b-col>
            </b-row>
            <b-row align-h="between" class="mt-1">
              <b-col cols="6" class="text-left">
                <h6>PPn 10%</h6>
              </b-col>
              <b-col cols="6" class="text-right">
                <h6>{{ formatCurrency(calculateTotalOrder() * 0.1) }}</h6>
              </b-col>
            </b-row>
            <b-row align-h="between" class="mt-4">
              <b-col cols="8" class="text-right">
                <h6>Total</h6>
              </b-col>
              <b-col cols="4" class="text-right">
                <h6>
                  {{
                    formatCurrency(
                      calculateTotalOrder() + calculateTotalOrder() * 0.1
                    )
                  }}
                </h6>
              </b-col>
            </b-row>
            <b-row align-h="between" class="mt-3">
              <b-col cols="8" class="text-left">
                <h6>Payment: Cash</h6>
              </b-col>
            </b-row>
          </div>
          <b-button
            class="mt-3"
            variant="primary"
            block
            @click="
              $bvModal.hide('bv-modal-example')
              postHistory()
              clearCart()
            "
          >
            <b>Print</b>
          </b-button>
          <b-button
            class="mt-3"
            variant="success"
            block
            @click="
              $bvModal.hide('bv-modal-example')
              postHistory()
              clearCart()
              createPDF()
            "
          >
            <b>Save to PDF</b>
          </b-button>
        </b-modal>
      </div>
      <b-button @click="clearCart()" block variant="danger" class="mt-2">
        <b>Cancel</b>
      </b-button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
// import jsPDF from 'jspdf'

export default {
  name: 'Cart',
  props: ['cart'],
  data() {
    return {
      urlApi: process.env.VUE_APP_URL,
      historyData: {
        invoice: '',
        orders: []
      }
    }
  },
  created() {
    this.getHistory()
  },
  methods: {
    // createPDF() {
    //   eslint-disable-next-line new-cap
    //   const doc = new jsPDF()
    //   doc.text('Hello world!', 10, 10)
    //   doc.save('a4.pdf')
    // },
    formatCurrency(number) {
      return number.toLocaleString('ID-JK', {
        style: 'currency',
        currency: 'IDR'
      })
    },
    increment(data) {
      console.log('Clicked')
      this.$emit('increment', data)
    },
    decrement(data) {
      this.$emit('decrement', data)
    },
    clearCart() {
      this.$emit('clearCart')
    },
    priceProduct() {
      this.priceProduct = this.price * this.count
    },
    showModal() {
      this.$refs['my-modal'].show()
    },
    hideModal() {
      this.$refs['my-modal'].hide()
    },
    toggleModal() {
      // We pass the ID of the button that we want to return focus to
      // when the modal has hidden
      this.$refs['my-modal'].toggle('#toggle-btn')
    },
    makeToast(variant = null, message) {
      this.$bvToast.toast(`${message}`, {
        title: 'Notification',
        variant: variant,
        solid: true
      })
    },
    calculateTotalOrder() {
      let totalPrice = 0
      for (let index = 0; index < this.cart.length; index++) {
        totalPrice +=
          this.cart[index].quantity * this.cart[index].product.product_price
      }
      return totalPrice
    },
    confirmPayment() {
      this.historyData.invoice = 'ARQ-' + Math.floor(Math.random() * 5000) * 250
      this.historyData.orders = this.cart
    },
    getHistory() {
      axios
        .get('http://127.0.0.1:3001/history')
        .then(response => {
          this.history = response.data.data
          this.invoice = response.data.data.invoice
          console.log(this.invoice)
        })
        .catch(error => {
          console.log(error)
        })
    },
    postHistory() {
      axios
        .post('http://127.0.0.1:3001/history', this.historyData, {})
        .then(response => {
          this.makeToast('success', 'Order has been successfully saved')
        })
        .catch(error => {
          console.log(error)
          this.makeToast('danger', 'Order Failed')
        })
    },
    removeFromCart(data) {
      const isInCart = this.isInCart(data)
      if (isInCart) {
        const itemInCart = this.cart.find(
          value => value.product_id === data.product_id
        )
        const index = this.cart.indexOf(itemInCart)
        if (index > -1) {
          this.cart.splice(index, 1)
        }
        // console.log(this.cart)
      }
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
  height: 400px;
  overflow-y: scroll;
  overflow-x: hidden;
}

/* .card-cart::-webkit-scrollbar {
  display: none;
} */

.empty-cart {
  text-align: center;
}
</style>
