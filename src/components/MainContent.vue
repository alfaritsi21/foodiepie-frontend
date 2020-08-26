<template>
  <b-container fluid>
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
                <img src="../assets/clipboard.png" alt />
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
                  <b-col cols="4" md="8"></b-col>
                  <b-col cols="3" md="2">
                    <b-dropdown
                      variant="none"
                      id="dropdown-1"
                      text="Sort by"
                      class="m-md-2 mb-2 pl-0 pr-0"
                    >
                      <b-dropdown-item>First Action</b-dropdown-item>
                      <b-dropdown-item>Second Action</b-dropdown-item>
                    </b-dropdown>
                  </b-col>
                  <b-col cols="3" md="2">
                    <b-dropdown variant="none" id="dropdown-2" text="Order by" class="m-md-2">
                      <b-dropdown-item>First Action</b-dropdown-item>
                      <b-dropdown-item>Second Action</b-dropdown-item>
                    </b-dropdown>
                  </b-col>
                </b-row>
              </b-container>
              <b-row class="pad-top-10">
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
                      v-if="addToCartButton === true"
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
                      @click="addToCart(item)"
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
            <div class="overflow-auto">
              <b-pagination-nav
                class="pagination"
                align="center"
                :link-gen="linkGen"
                :number-of-pages="pagination.totalPage"
                use-router
              ></b-pagination-nav>
            </div>
          </b-col>
        </b-row>
      </b-col>
      <b-col md="4" lg="4" xl="4" class="cart-content default-container small-container">
        <div v-if="isShowEmpty === true" class="empty-cart">
          <img src="../assets/food-and-restaurant.png" alt />
          <h4>Your cart is empty</h4>
          <h5>Please add some items from the menu</h5>
        </div>
        <div v-else class="mar-top-20">
          <Cart
            name="Kopi"
            price="2000"
            :count="count"
            @increment="incrementCount"
            @decrement="decrementCount"
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
      cart: [],
      order: 'product_id',
      order_type: 'ASC',
      products: [],
      isShowEmpty: false,
      addToCartButton: true,
      pagination: {
        page: 1,
        totalPage: 3,
        limit: 6,
        totalData: 17,
        prevLink: null,
        nextLink: null
      }
    }
  },
  created() {
    this.getProduct()
  },
  methods: {
    linkGen(pageNum) {
      console.log(this.pagination)
      return pageNum === 1 ? '?' : `?page=${pageNum}`
    },
    incrementCount(data) {
      this.count += data
    },
    decrementCount(data) {
      if (this.count > 0) {
        this.count -= data
      }
    },
    addToCart(data) {
      const setCart = {
        product_id: data.product_id,
        quantity: 1
      }
      this.cart = [...this.cart, setCart]
      console.log(this.cart)
    },
    getProduct() {
      axios
        .get(
          `http://127.0.0.1:3001/product?page=${this.pagination.page}&limit=${this.pagination.limit}&order=${this.order}&order_type=${this.order_type}`,
          null,
          {}
        )
        .then((response) => {
          this.products = response.data.data
          this.pagination = response.data.pagination
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

.empty-cart {
  text-align: center;
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
</style>
