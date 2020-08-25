<template>
  <div>
    <a id="show-btn" @click="showModal">
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
          <b-button class="mt-4" variant="danger" @click="hideModal(); makeToast('danger');">Confirm</b-button>
        </b-col>
      </b-row>
    </b-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        email: '',
        name: '',
        food: null,
        file2: null,
        checked: [],
        selected: null,
        options: [
          { value: 'A', text: 'Option A (from options prop)' },
          { value: 'B', text: 'Option B (from options prop)' }
        ]
      },
      foods: [
        { text: 'Select One', value: null },
        'Carrots',
        'Beans',
        'Tomatoes',
        'Corn'
      ],
      show: true
    }
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
