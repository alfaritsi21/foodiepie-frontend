import axios from 'axios'

export default {
  state: {},
  mutations: {},
  actions: {
    getCategory() {
      return new Promise((resolve, reject) => {
        axios
          .get('http://127.0.0.1:3001/category')
          .then(response => {
            const categories = response.data.data
            console.log(categories)
            for (let index = 0; index < categories.length; index++) {
              this.options = [
                ...this.options,
                {
                  value: categories[index].category_id,
                  text: categories[index].category_name
                }
              ]
            }
          })
          .catch(error => {
            console.log(error)
          })
      })
    }
  },
  getters: {}
}
