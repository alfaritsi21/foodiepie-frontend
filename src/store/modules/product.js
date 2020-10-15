import axios from 'axios'

export default {
  state: {
    urlApi: process.env.VUE_APP_URL,
    pagination: {
      page: 1,
      totalPage: 0,
      limit: 6,
      totalData: 40
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
    },
    setOrder(state, payload) {
      state.order = payload
    },
    setOrderType(state, payload) {
      state.order_type = payload
    }
  },
  actions: {
    getProducts(context, payload) {
      axios
        .get(
          `${context.state.urlApi}product?page=${context.state.pagination.page}&limit=${context.state.pagination.limit}&order=${context.state.order}&order_type=${context.state.order_type}`
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
          .post(`${context.state.urlApi}product`, payload)
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
      const data = new FormData()
      data.append('product_id', payload.product_id)
      data.append('product_name', payload.product_name)
      data.append('category_id', payload.category_id)
      data.append('product_price', payload.product_price)
      data.append('product_status', payload.product_status)
      data.append('product_image', payload.product_image)
      return new Promise((resolve, reject) => {
        axios
          .patch(
            `${context.state.urlApi}product/${payload.product_id}`,
            data,
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
          .delete(`${context.state.urlApi}product/${payload}`)
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
    searchProduct(context, payload) {
      console.log(payload.product)
      return new Promise((resolve, reject) => {
        axios
          .post(`${context.state.urlApi}product/search/`, payload, {})
          .then(response => {
            context.commit('setProduct', response.data)
            context.commit('setCartButton', response.data)
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
