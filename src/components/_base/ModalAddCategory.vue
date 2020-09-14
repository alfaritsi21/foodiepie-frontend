<template>
  <div>
    <a id="show-btn" @click="showModal">
      <img src="../../assets/add.png" alt />
    </a>

    <b-modal ref="my-modal" hide-footer title="Create Category">
      <div class="d-block text-center">
        <b-form @submit="onSubmit" @reset="onReset" v-if="show">
          <b-row>
            <b-col cols="2" class="form-name">
              <b-form-group id="input-group-1" label="Name :" label-for="input-1"></b-form-group>
            </b-col>
            <b-col cols="10">
              <b-form-input v-model="form.category_name" placeholder="Enter category name"></b-form-input>
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
          postCategory()
        "
      >Add</b-button>
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
// import axios from 'axios'
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      form: {
        category_name: ''
      },
      show: true
    }
  },
  methods: {
    ...mapActions(['addCategory']),
    postCategory() {
      // console.log(this.form)
      const data = {
        category_name: this.form.category_name
      }

      this.addCategory(data)
        .then((response) => {
          console.log(response)
          this.makeToast(
            'success',
            `Category ${this.form.category_name} succesfully created`
          )
        })
        .catch((error) => {
          console.log(error)
          this.makeToast(
            'danger',
            `Product ${this.form.product_name} failed to create`
          )
        })
    },
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
