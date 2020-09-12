import axios from 'axios'

export default {
  state: {
    pagination: {
      page: 1,
      totalPage: 0,
      limit: 6,
      totalData: 29
    },
    perPage: 0,
    products: [],
    addToCartButton: [],
    order: 'product_id',
    order_type: 'ASC'
  },
  mutations: {
    setProduct(state, payload) {
      state.products = payload.data
      state.perPage = payload.pagination.limit
      state.totalPage = payload.pagination.totalPage
      state.totalData = payload.pagination.totalData
    },
    setCartButton(state, payload) {
      for (let i = 0; i < payload.length; i++) {
        state.addToCartButton = [...state.addToCartButton, true]
      }
    },
    setPage(state, payload) {
      state.pagination.page = payload
    }
  },
  actions: {
    getProducts(context, payload) {
      axios
        .get(
          `http://127.0.0.1:3001/product?page=${context.state.pagination.page}&limit=${context.state.pagination.limit}&order=${context.state.order}&order_type=${context.state.order_type}`
        )
        .then(response => {
          context.commit('setProduct', response.data)
          context.commit('setCartButton', response.data)
          // context.state.products = response.data.data
          // context.state.perPage = response.data.pagination.limit
          // context.state.totalPage = response.data.pagination.totalPage
          // context.state.totalData = response.data.pagination.totalData
          // for (let i = 0; i < this.products.length; i++) {
          //   this.addToCartButton = [...this.addToCartButton, true]
          // }
        })
        .catch(error => {
          console.log(error)
        })
    },
    addProducts(context, payload) {
      // console.log(payload)
      return new Promise((resolve, reject) => {
        axios
          .post('http://127.0.0.1:3001/product', payload)
          .then(response => {
            console.log(response)
            resolve(response.data)
          })
          .catch(error => {
            reject(error.response)
            console.log(error.response)
            reject(error.response.msg)
          })
      })
    },
    patchProduct(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .patch(
            `http://127.0.0.1:3001/product/${payload.product_id}`,
            payload,
            {}
          )
          .then(response => {
            console.log(response)
            resolve(response.data)
          })
          .catch(error => {
            reject(error.response)
            console.log(error.response)
            reject(error.response.msg)
          })
      })
    },
    deleteProduct(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .delete(`http://127.0.0.1:3001/product/${payload}`)
          .then(response => {
            console.log(response)
            resolve(response.data)
          })
          .catch(error => {
            reject(error.response)
            console.log(error.response)
            reject(error.response.msg)
          })
      })
    },
    searchProduct() {
      return new Promise((resolve, reject) => {
        axios
          .post('http://127.0.0.1:3001/product/search/', this.form, {})
          .then(response => {
            this.products = response.data.data
          })
          .catch(error => {
            console.log(error)
          })
      })
    }
  },

  getters: {
    getLimit(state) {
      return state.pagination.limit
    },
    getPage(state) {
      return state.pagination.page
    },
    getPerPage(state) {
      return state.perPage
    },
    getTotalData(state) {
      return state.pagination.totalData
    },
    getTotalPage(state) {
      return state.pagination.totalPage
    },
    getProduct(state) {
      return state.products
    },
    getCartButton(state) {
      return state.addToCartButton
    },
    getOrder(state) {
      return state.order
    },
    getOrderType(state) {
      return state.order_type
    }
  }
}
