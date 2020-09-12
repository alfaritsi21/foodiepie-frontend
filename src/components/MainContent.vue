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
            <!-- <img src="../assets/menu-patty1.png" alt /> -->
            <a class="logout" @click="handleLogout">Logout</a>
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
            <!-- <img src="../assets/magnifying-glass.png" alt /> -->
          </b-col>
          <b-col
            cols="3"
            sm="3"
            md="1"
            lg="1"
            xl="1"
            class="default-container side-cart align-center pad-top-2 pad-side-20 box-shadow"
          ></b-col>
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
            <b-badge variant="light">{{ cart.length }}</b-badge>
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
                <router-link to="/" v-b-tooltip.hover title="History">
                  <img src="../assets/fork.png" alt />
                </router-link>
              </b-col>
              <b-col class="pad-upside">
                <router-link to="/history" v-b-tooltip.hover title="History">
                  <img src="../assets/clipboard.png" alt />
                </router-link>
              </b-col>
              <b-col class="pad-upside">
                <a href="#" v-b-tooltip.hover title="Create Product">
                  <ModalMenu @getProduct="getProduct" />
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
                <div>
                  <b-button
                    class="cart-button side-cart"
                    v-b-toggle.sidebar-right
                    variant="primary"
                  >
                    <b-icon icon="cart4"></b-icon>
                    <b-badge variant="light">{{ cart.length }}</b-badge>
                  </b-button>
                  <b-sidebar id="sidebar-right" right shadow>
                    <div class="px-3 py-2">
                      <div class="text-center mar-top-10">
                        <b-button block variant="primary">
                          Cart
                          <b-badge variant="light">{{ cart.length }}</b-badge>
                        </b-button>
                      </div>
                      <div class="mar-top-20">
                        <Cart
                          :cart="cart"
                          @increment="incrementCart"
                          @decrement="decrementCart"
                          @clearCart="clearCart"
                        />
                      </div>
                    </div>
                  </b-sidebar>
                </div>
                <b-row>
                  <!-- <b-col cols="1" md="1">
                    <b-button variant="outline-success" @click="searchProduct()"
                      ><b-icon-search></b-icon-search
                    ></b-button>
                  </b-col>-->
                  <b-col cols="5" md="5">
                    <b-row>
                      <b-col cols="1" sm="1" md="1" lg="1" xl="1">
                        <b-button variant="outline-success" @click="searchProduct()">
                          <b-icon-search></b-icon-search>
                        </b-button>
                      </b-col>
                      <b-col cols="9" sm="9" md="10" lg="10" xl="10">
                        <mdb-form-inline>
                          <mdbIcon icon="search" />
                          <input
                            v-model="form.product_name"
                            v-on:keyup.enter="searchProduct()"
                            class="form-control mr-sm-2"
                            type="text"
                            placeholder="Search Product"
                            aria-label="Search"
                          />
                        </mdb-form-inline>
                      </b-col>
                    </b-row>
                  </b-col>

                  <b-col cols="3" md="3">
                    <!-- <p>Sort by :</p> -->
                    <b-form-select
                      v-model="order"
                      :options="optionsOrder"
                      @change="getProduct()"
                      class="mb-3"
                    ></b-form-select>
                  </b-col>
                  <b-col cols="3" md="3">
                    <!-- <p>Order by :</p> -->
                    <b-form-select
                      v-model="order_type"
                      :options="optionsType"
                      @change="getProduct()"
                      class="mb-3"
                    ></b-form-select>
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
                    v-if="!isInCart(item)"
                    v-bind:title="item.product_name"
                    img-src="https://picsum.photos/600/300/?image=20"
                    img-alt="Image"
                    img-top
                    tag="article"
                    style="max-width: 20rem;"
                    class="mb-2"
                  >
                    <b-card-text>{{ formatCurrency(item.product_price) }}</b-card-text>

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
                            v-b-tooltip.hover
                            title="Edit Product"
                            class="mt-2"
                          >
                            <ModalEditProduct :product="item" @getProduct="getProduct" />
                          </b-button>
                        </b-col>
                        <b-col md="6">
                          <b-button
                            block
                            variant="outline-danger"
                            v-b-tooltip.hover
                            title="Delete Product"
                            class="mt-2"
                          >
                            <ModalDeleteProduct :product="item" @getProduct="getProduct" />
                          </b-button>
                        </b-col>
                      </b-row>
                    </b-container>
                  </b-card>
                  <b-card
                    v-else
                    v-bind:title="item.product_name"
                    img-src="https://scontent.fbdo1-2.fna.fbcdn.net/v/t1.0-9/118653909_1431063837097187_8105755792088749157_n.jpg?_nc_cat=105&_nc_sid=730e14&_nc_eui2=AeHYiNCkN7dILMeEpJY2LpTALckXCwb2wjgtyRcLBvbCODMPFCINeUCVB0MTnPgC6Gk9c8kyl1klEWL2oL5Gi_sw&_nc_ohc=UF2CrlAq4TwAX9IUaJF&_nc_ht=scontent.fbdo1-2.fna&oh=f8e71f785f005fb68f90fbf18f8c0285&oe=5F71F657"
                    img-alt="menu"
                    img-top
                    tag="image-menu"
                    style="max-width: 20rem;"
                    class="mb-2"
                  >
                    <b-card-text>{{ formatCurrency(item.product_price) }}</b-card-text>

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
                            v-b-tooltip.hover
                            title="Delete Product"
                            class="mt-2"
                          >
                            <ModalDeleteProduct :product="item" @getProduct="getProduct" />
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
// import axios from 'axios'
import Cart from './_base/Cart.vue'
import ModalMenu from './_base/ModalMenu'
import ModalEditProduct from './_base/ModalEditProduct'
import ModalDeleteProduct from './_base/ModalDeleteProduct'
import { mapActions, mapGetters, mapMutations } from 'vuex'

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
      // order: 'product_id',
      // order_type: 'ASC',
      // products: [],
      isShowEmpty: false,
      // addToCartButton: [],
      // pagination: {
      //   page: 1,
      //   totalPage: 0,
      //   limit: 6,
      //   totalData: 17
      // },
      // perPage: 0,
      currentPage: 1
    }
  },
  created() {
    this.getProduct()
  },
  computed: {
    ...mapGetters({
      pagination: {
        page: 'getPage',
        totalPage: 'getTotalPage',
        limit: 'getLimit',
        totalData: 'getTotalData'
      },
      perPage: 'getPerPage',
      rows: 'getTotalData',
      products: 'getProduct',
      addToCartButton: 'getCartButton',
      order: 'getOrder',
      order_type: 'getOrderType'
    })
    // rows() {
    //   return this.totalData
    // }
  },
  methods: {
    ...mapActions({ getProduct: 'getProducts' }),
    ...mapMutations(['setPage']),
    handlePageChange(numberPage) {
      this.$router.push(`?page=${numberPage}`)
      // this.page = numberPage
      this.setPage(numberPage)
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
    // getProduct() {
    //   axios
    //     .get(
    //       `http://127.0.0.1:3001/product?page=${this.page}&limit=${this.limit}&order=${this.order}&order_type=${this.order_type}`
    //     )
    //     .then(response => {
    //       this.products = response.data.data
    //       this.perPage = response.data.pagination.limit
    //       this.totalPage = response.data.pagination.totalPage
    //       this.totalData = response.data.pagination.totalData
    //       for (let i = 0; i < this.products.length; i++) {
    //         this.addToCartButton = [...this.addToCartButton, true]
    //       }
    //     })
    //     .catch(error => {
    //       console.log(error)
    //     })
    // },
    // searchProduct() {
    //   axios
    //     .post('http://127.0.0.1:3001/product/search/', this.form, {})
    //     .then((response) => {
    //       this.products = response.data.data
    //     })
    //     .catch((error) => {
    //       console.log(error)
    //     })
    // },
    formatCurrency(number) {
      return number.toLocaleString('ID-JK', {
        style: 'currency',
        currency: 'IDR'
      })
    },
    ...mapActions({ handleLogout: 'logout' })
    // hndleLogout() {
    //   console.log('logout clicked')
    // }
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

.cart-button {
  position: absolute;
  top: 480px;
  left: 300px;
  width: 65px;
  height: 65px;
  z-index: 10;
  border-radius: 15px;
}

.logout {
  cursor: pointer;
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
