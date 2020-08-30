<template>
  <div>
    <a id="show-btn" @click="
        showModal()
        getProduct()
      ">
      <b-icon-trash></b-icon-trash>
    </a>

    <b-modal ref="my-modal" hide-footer title="Confirmation Delete Product">
      <div class="d-block text-center">Are you sure you want to delete this product ?</div>
      <b-row>
        <b-col cols="3" md="3"></b-col>
        <b-col cols="3" md="3">
          <b-button class="mt-4" variant="warning" @click="toggleModal" style="color: white;">Cancel</b-button>
        </b-col>
        <b-col cols="3" md="3">
          <b-button
            class="mt-4"
            variant="danger"
            @click="
              hideModal()
              deleteProduct()
            "
          >Confirm</b-button>
        </b-col>
      </b-row>
    </b-modal>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  props: ['product'],
  data() {
    return {
      product_id: [],
      form: {
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
    this.getProduct()
  },
  methods: {
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
    makeToast(variant = null) {
      this.$bvToast.toast('Product Deleted Successfully', {
        title: 'Notification',
        variant: variant,
        solid: true
      })
    },
    deleteProduct() {
      axios
        .delete(
          `http://127.0.0.1:3001/product/${this.product.product_id}`,
          this.form,
          {}
        )
        .then((response) => {
          const savedProduct = response.data.data
          this.makeToast(
            'success',
            `Product ${savedProduct.product_name} succesfully deleted`
          )
          this.getProduct()
        })
        .catch((error) => {
          console.log(error)
          this.makeToast(
            'danger',
            `Product ${this.form.product_name} failed to delete`
          )
        })
    },
    getProduct() {
      this.$emit('getProduct')
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
