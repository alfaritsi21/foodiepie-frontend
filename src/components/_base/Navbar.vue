<template>
  <b-container fluid>
    <!-- Stack the columns on mobile by making one full-width and the other half-width -->
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
            <img src="../../assets/menu-patty1.png" alt />
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
            <img src="../../assets/magnifying-glass.png" alt />
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
              <b-sidebar id="sidebar-right" right shadow>
                <div class="px-3 py-2">
                  <div class="text-center">
                    <b-button block variant="primary">
                      Cart
                      <b-badge variant="light">{{count}}</b-badge>
                    </b-button>
                    <div>
                      <div v-if="isShowEmpty === true" class="empty-cart">
                        <img src="../../assets/food-and-restaurant.png" alt />
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
                    </div>
                  </div>
                </div>
              </b-sidebar>
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
            <b-badge variant="light">{{count}}</b-badge>
          </b-button>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
// import Card from 'Card.vue'
// import MainContent from '../MainContent'

import Cart from './Cart.vue'

export default {
  name: 'Navbar',
  components: {
    Cart
  },
  data() {
    return {
      count: 0,
      isShowEmpty: false
    }
  },
  methods: {
    incrementCount(data) {
      this.count += data
    },
    decrementCount(data) {
      if (this.count > 0) {
        this.count -= data
      }
    }
  }
}
</script>

<style>
/* .default-container {
  margin: 0;
  padding: 0;
} */
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
