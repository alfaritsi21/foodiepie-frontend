<template>
  <div>
    <a id="show-btn" @click="
        showModal()
        getProduct()
      ">
      <b-icon-pencil-square></b-icon-pencil-square>
    </a>

    <b-modal ref="my-modal" hide-footer title="Edit Product">
      <div class="d-block text-center">
        <b-form @submit="onSubmit" @reset="onReset" v-if="show">
          <b-row>
            <b-col cols="2" class="form-name">
              <b-form-group id="input-group-1" label="Name:" label-for="input-1"></b-form-group>
            </b-col>
            <b-col cols="10">
              <b-form-input v-model="form.product_name" placeholder="Enter product name"></b-form-input>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="2" class="form-name">
              <b-form-group id="input-group-3" label="Price :" label-for="input-3"></b-form-group>
            </b-col>
            <b-col cols="10">
              <b-form-input
                type="number"
                v-model="form.product_price"
                placeholder="Enter product price"
              ></b-form-input>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="2" class="form-name">
              <b-form-group id="input-group-4" label="Category:" label-for="input-4"></b-form-group>
            </b-col>
            <b-col cols="10">
              <div>
                <b-form-select v-model="form.category_id" :options="options" class="mb-3">
                  <!-- This slot appears above the options from 'options' prop -->
                  <template v-slot:first>
                    <b-form-select-option :value="0" disabled>-- Please select an option --</b-form-select-option>
                  </template>
                </b-form-select>
              </div>
            </b-col>
          </b-row>
        </b-form>
      </div>
      <b-button
        class="mt-3"
        variant="primary"
        block
        @click="
          hideModal()
          editProduct()
        "
      >Confirm</b-button>
      <b-button
        class="mt-2"
        variant="danger"
        block
        @click="toggleModal"
        style="color: white;"
      >Cancel</b-button>
    </b-modal>
  </div>
</template>

<script>
import axios from 'axios'
import { mapActions } from 'vuex'

export default {
  props: ['product'],
  data() {
    return {
      product_id: [],
      form: {
        product_id: this.product.product_id,
        product_name: this.product.product_name,
        product_price: this.product.product_price,
        category_id: this.product.category_id,
        product_status: 1,
        food: null,
        file2: null,
        checked: []
      },
      selected: null,
      options: [],
      foods: [{ text: 'Select One', value: null }],
      show: true
    }
  },
  created() {
    this.getCategory()
  },
  methods: {
    ...mapActions(['patchProduct']),
    ...mapActions(['getProducts']),

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
    onSubmit(evt) {
      evt.preventDefault()
      alert(JSON.stringify(this.form))
    },
    onReset(evt) {
      evt.preventDefault()
      // Reset our form values
      this.form.email = ''
      this.form.name = ''
      this.form.food = null
      this.form.checked = []
      // Trick to reset/clear native browser form validation state
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    },
    makeToast(variant = null, message) {
      this.$bvToast.toast(`${message}`, {
        title: 'Notification',
        variant: variant,
        solid: true
      })
    },
    getCategory() {
      axios
        .get('http://127.0.0.1:3001/category')
        .then((response) => {
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
        .catch((error) => {
          console.log(error)
        })
    },
    editProduct() {
      // const data = new FormData()
      // data.append('product_id', this.form.product_id)
      // data.append('product_name', this.form.product_name)
      // data.append('category_id', this.form.category_id)
      // data.append('product_price', this.form.product_price)
      // data.append('product_status', this.form.product_status)
      // data.append('product_image', this.form.product_image)
      console.log(this.form)

      this.patchProduct(this.form)
        .then((response) => {
          console.log(response)
          this.getProducts()
          this.makeToast(
            'success',
            `Product ${this.form.product_name} succesfully created`
          )
        })
        .catch((error) => {
          console.log(error)
          this.makeToast(
            'danger',
            `Product ${this.form.product_name} failed to create`
          )
        })
    }
  }
}
</script>

<style scoped>
.form-name {
  text-align: center;
  margin-top: 5px;
}

.text-left {
  text-align: start;
}
</style>
