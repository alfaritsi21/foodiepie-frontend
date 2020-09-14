import axios from 'axios'

export default {
  state: {
    category: [],
    categoryOptions: []
  },
  mutations: {
    setCategory(state, payload) {
      state.category = payload.data
    },
    setCategoryItem(state, payload) {
      for (let index = 0; index < payload.length; index++) {
        state.categoryOptions = [
          ...state.categoryOptions,
          {
            value: payload.data[index].category_id,
            text: payload.data[index].category_name
          }
        ]
      }
    }
  },
  actions: {
    getCategories(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .get('http://127.0.0.1:3001/category')
          .then(response => {
            // const categories = response.data.data
            context.commit('setCategory', response.data)
            context.commit('setCategoryItem', response.data)
            resolve(response.data.data)
          })
          .catch(error => {
            console.log(error)
          })
      })
    },
    addCategory(context, payload) {
      // console.log(payload)
      return new Promise((resolve, reject) => {
        axios
          .post('http://127.0.0.1:3001/category', payload)
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
    patchCategory(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .patch(
            `http://127.0.0.1:3001/category/${payload.category_id}`,
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
    deleteCategory(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .delete(`http://127.0.0.1:3001/category/${payload.category_id}`)
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
    }
  },
  getters: {
    getCategory(state) {
      return state.category
    },
    getCategoryId(state) {
      return state.category_id
    },
    getCategoryName(state) {
      return state.category_name
    },
    getCategoryCreated(state) {
      return state.category_created_at
    },
    getCategoryUpdated(state) {
      return state.category_updated_at
    }
  }
}
