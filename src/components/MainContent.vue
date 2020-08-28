<template>
  <b-container fluid>
    <b-row>
      <b-col cols="12" sm="12" md="8" lg="8" xl="8" class="default-container mar-top-3">
        <b-row>
          <b-col
            cols="2"
            sm="2"
            md="1"
            lg="1"
            xl="1"
            class="default-container align-center pad-top-10 pad-left-10 menu-patty"
          >
            <img src="../assets/menu-patty1.png" alt />
          </b-col>
          <b-col
            cols="5"
            sm="5"
            md="9"
            lg="10"
            xl="10"
            class="default-container align-center pad-top-10 box-shadow"
          >
            <h2>Foodiepie</h2>
          </b-col>
          <b-col
            cols="2"
            sm="2"
            md="2"
            lg="1"
            xl="1"
            class="default-container align-center pad-top-10 box-shadow"
          >
            <img src="../assets/magnifying-glass.png" alt />
          </b-col>
          <b-col
            cols="3"
            sm="3"
            md="1"
            lg="1"
            xl="1"
            class="default-container side-cart align-center pad-top-2 pad-side-20 box-shadow"
          >
            <div>
              <b-button class="cart-button" v-b-toggle.sidebar-right variant="primary">
                <b-icon icon="cart4"></b-icon>
              </b-button>
            </div>
          </b-col>
        </b-row>
      </b-col>
      <b-col
        cols="12"
        sm="12"
        md="4"
        lg="4"
        xl="4"
        class="default-container small-container box-shadow mar-top-3"
      >
        <div class="text-center mar-top-10">
          <b-button variant="primary">
            Cart
            <b-badge variant="light">{{cart.length}}</b-badge>
          </b-button>
        </div>
      </b-col>
    </b-row>
    <!-- ========================================================== -->
    <b-row>
      <b-col cols="12" sm="12" md="8" lg="8" xl="8">
        <b-row>
          <b-col
            cols="2"
            sm="2"
            md="1"
            lg="1"
            xl="1"
            class="default-container align-center box-shadow-nav side-navbar"
          >
            <b-row cols="1">
              <b-col class="pad-upside">
                <img src="../assets/fork.png" alt />
              </b-col>
              <b-col class="pad-upside">
                <a href="history">
                  <img src="../assets/clipboard.png" alt />
                </a>
              </b-col>
              <b-col class="pad-upside">
                <a href="#">
                  <ModalMenu />
                  <!-- <img src="../assets/add.png" alt /> -->
                </a>
              </b-col>
            </b-row>
          </b-col>
          <b-col
            cols="10"
            sm="10"
            md="11"
            lg="11"
            xl="11"
            class="default-container align-center main-content"
          >
            <b-container class="bv-example-row mar-10">
              <b-container class="bv-example-row container-sort">
                <b-row>
                  <b-col cols="4" md="6">
                    <div>
                      <mdb-form-inline>
                        <mdbIcon icon="search" />
                        <!-- <p>Search :</p> -->
                        <input
                          v-model="form.product_name"
                          v-on:keyup.enter="searchProduct()"
                          class="form-control mr-sm-2"
                          type="text"
                          placeholder="Search Product"
                          aria-label="Search"
                        />
                      </mdb-form-inline>
                    </div>
                  </b-col>
                  <b-col cols="4" md="3">
                    <!-- <p>Sort by :</p> -->
                    <b-form-select
                      v-model="order"
                      :options="optionsOrder"
                      @change="getProduct()"
                      class="mb-3"
                    ></b-form-select>
                    <!-- <b-dropdown
                      variant="none"
                      id="dropdown-1"
                      text="Sort by"
                      class="m-md-2 mb-2 pl-0 pr-0"
                    >
                      <b-dropdown-item>Product ID</b-dropdown-item>
                      <b-dropdown-item>Category ID</b-dropdown-item>
                    </b-dropdown>-->
                  </b-col>
                  <b-col cols="4" md="3">
                    <!-- <p>Order by :</p> -->
                    <b-form-select
                      v-model="order_type"
                      :options="optionsType"
                      @change="getProduct()"
                      class="mb-3"
                    ></b-form-select>
                    <!-- <b-dropdown variant="none" id="dropdown-2" text="Order by" class="m-md-2">
                      <b-dropdown-item>First Action</b-dropdown-item>
                      <b-dropdown-item>Second Action</b-dropdown-item>
                    </b-dropdown>-->
                  </b-col>
                </b-row>
              </b-container>
              <b-row class="pad-top-10 main-list">
                <b-col
                  cols="12"
                  sm="6"
                  md="6"
                  lg="4"
                  xl="4"
                  v-for="(item, index) in products"
                  :key="index"
                >
                  <b-card
                    v-bind:title="item.product_name"
                    img-src="https://picsum.photos/600/300/?image=25"
                    img-alt="Image"
                    img-top
                    tag="article"
                    style="max-width: 20rem;"
                    class="mb-2"
                  >
                    <b-card-text>Rp. {{item.product_price}}</b-card-text>

                    <b-button
                      v-if="!isInCart(item)"
                      block
                      variant="primary"
                      @click="addToCart(item)"
                      v-b-tooltip.hover
                      title="Add Order"
                    >Add to Cart</b-button>
                    <b-button
                      v-else
                      block
                      variant="danger"
                      @click="removeFromCart(item)"
                      v-b-tooltip.hover
                      title="Cancel Order"
                    >Cancel</b-button>

                    <b-container fluid class="bv-example-row mt-1 pr-0 pl-0">
                      <b-row>
                        <b-col md="6">
                          <b-button
                            block
                            variant="outline-success"
                            @click="addToCart(item)"
                            v-b-tooltip.hover
                            title="Edit Product"
                            class="mt-2"
                          >
                            <ModalEditProduct :product="item" />
                          </b-button>
                        </b-col>
                        <b-col md="6">
                          <b-button
                            block
                            variant="outline-danger"
                            @click="addToCart(item)"
                            v-b-tooltip.hover
                            title="Delete Product"
                            class="mt-2"
                          >
                            <ModalDeleteProduct :product="item" />
                          </b-button>
                        </b-col>
                      </b-row>
                    </b-container>
                  </b-card>
                </b-col>
              </b-row>
            </b-container>
            <b-container class="bv-example-row pad-left-10">
              <!-- <b-container class="bv-example-row container-sort"> -->
              <b-row>
                <b-col cols="4" md="6">
                  <div>
                    <div class="overflow-auto">
                      <b-pagination
                        v-model="currentPage"
                        :total-rows="rows"
                        :per-page="perPage"
                        @change="handlePageChange"
                        aria-controls="my-table"
                      ></b-pagination>
                    </div>
                  </div>
                </b-col>
              </b-row>
              <!-- </b-container> -->
            </b-container>
          </b-col>
        </b-row>
      </b-col>
      <b-col md="4" lg="4" xl="4" class="cart-content default-container small-container">
        <div class="mar-top-20">
          <Cart
            :cart="cart"
            @increment="incrementCart"
            @decrement="decrementCart"
            @clearCart="clearCart"
          />
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
// import Card from './_base/Card.vue'
import axios from 'axios'
import Cart from './_base/Cart.vue'
import ModalMenu from './_base/ModalMenu'
import ModalEditProduct from './_base/ModalEditProduct'
import ModalDeleteProduct from './_base/ModalDeleteProduct'

export default {
  name: 'MainContent',
  components: {
    Cart,
    ModalMenu,
    ModalEditProduct,
    ModalDeleteProduct
  },
  data() {
    return {
      count: 0,
      optionsOrder: [
        { value: 'product_id', text: 'Sort By' },
        { value: 'product_id', text: 'Product ID' },
        { value: 'product_name', text: 'Product Name' },
        { value: 'product_price', text: 'Product Price' },
        { value: 'category_id', text: 'Category ID' },
        { value: 'product_created_at', text: 'Product Created' }
      ],
      optionsType: [
        { value: 'ASC', text: 'Order Type' },
        { value: 'ASC', text: 'Ascending' },
        { value: 'DESC', text: 'Descending' }
      ],
      form: {
        product_name: ''
      },
      cart: [],
      order: 'product_id',
      order_type: 'ASC',
      products: [],
      isShowEmpty: false,
      addToCartButton: [],
      // pagination: {
      page: 1,
      totalPage: 3,
      limit: 6,
      totalData: 17,
      // },
      perPage: 0,
      currentPage: 1
    }
  },
  created() {
    this.getProduct()
  },
  computed: {
    rows() {
      return this.totalData
    }
  },
  methods: {
    handlePageChange(numberPage) {
      this.$router.push(`?page=${numberPage}`)
      this.page = numberPage
      this.getProduct()
    },
    incrementCart(data) {
      // console.log(data) // item yang di klik
      // console.log(this.cart) // array
      const incrementData = this.cart.find(
        (value) => value.product_id === data.product_id
      )
      incrementData.quantity += 1
      // incrementData.totalPrice = incrementData.price * ....
      console.log(this.cart)
    },
    decrementCart(data) {
      // console.log(data) // item yang di klik
      // console.log(this.cart) // array
      const decrementData = this.cart.find(
        (value) => value.product_id === data.product_id
      )
      decrementData.quantity -= 1
      if (decrementData.quantity <= 0) {
        this.removeFromCart(data)
      }
      // incrementData.totalPrice = incrementData.price * ....
      // console.log(this.cart)
    },
    checkCart(data) {
      return this.cart.some((item) => item.product_id === data.product_id)
    },
    incrementCount(data) {
      this.count += data
    },
    decrementCount(data) {
      if (this.count > 0) {
        this.count -= data
      }
    },
    isInCart(data) {
      const itemInCart = this.cart.find(
        (value) => value.product_id === data.product_id
      )
      if (itemInCart) {
        return true
      } else {
        return false
      }
    },
    addToCart(data) {
      const isInCart = this.isInCart(data)
      if (!isInCart) {
        const setCart = {
          product_id: data.product_id,
          product: data,
          quantity: 1
        }
        this.cart = [...this.cart, setCart]
        // console.log(this.cart)
      }
    },
    removeFromCart(data) {
      const isInCart = this.isInCart(data)
      if (isInCart) {
        const itemInCart = this.cart.find(
          (value) => value.product_id === data.product_id
        )
        const index = this.cart.indexOf(itemInCart)
        if (index > -1) {
          this.cart.splice(index, 1)
        }
        // console.log(this.cart)
      }
    },
    clearCart() {
      this.cart = []
    },
    getProduct() {
      axios
        .get(
          `http://127.0.0.1:3001/product?page=${this.page}&limit=${this.limit}&order=${this.order}&order_type=${this.order_type}`
        )
        .then((response) => {
          this.products = response.data.data
          this.perPage = response.data.pagination.limit
          for (let i = 0; i < this.products.length; i++) {
            this.addToCartButton = [...this.addToCartButton, true]
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },
    searchProduct() {
      axios
        .post('http://127.0.0.1:3001/product/search/', this.form, {})
        .then((response) => {
          this.products = response.data.data
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
}
</script>

<style scoped>
.height {
  height: 1700px;
  /* background-color: cornflowerblue; */
}

.main-content {
  background-color: rgba(190, 195, 202, 0.3);
}

.pad-upside {
  padding: 20px 13px;
}

.box-shadow-nav {
  box-shadow: 15px 0 15px -15px rgba(0, 0, 0, 0.25);
}

.empty-cart h5 {
  color: #cecece;
}

.pagination {
  align-items: center;
}

.container-sort {
  background-color: none;
}

/* =================================== */
.align-center {
  text-align: center;
}

.pad-10 {
  padding: 10px;
}

.pad-5 {
  padding: 5px;
}

.pad-top-2 {
  padding-top: 2px;
}

.pad-top-10 {
  padding-top: 10px;
}

.pad-top-20 {
  padding-top: 10px;
}

.pad-side-20 {
  padding-left: 20px;
  padding-right: 20px;
}

.pad-left-10 {
  padding-left: 20px;
}

.pad-right-20 {
  padding-right: 20px;
}

.mar-10 {
  margin: 10px;
}

.mar-top-3 {
  margin-top: 3px;
}

.mar-top-10 {
  margin-top: 10px;
}

.mar-top-20 {
  margin-top: 20px;
}

.box-shadow {
  box-shadow: 0px 2px 1px rgba(0, 0, 0, 0.25);
}

.menu-patty img {
  box-shadow: none;
}

.main-list {
  max-height: 500px;
  overflow-y: scroll;
  overflow-x: hidden;
}

@media (max-width: 670px) {
}

@media (max-width: 768px) {
  .small-container {
    display: none;
  }
}

@media (min-width: 768px) {
  .side-cart {
    display: none;
  }
}
</style>
