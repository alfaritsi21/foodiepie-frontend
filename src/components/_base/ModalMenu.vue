<template>
  <div>
    <a id="show-btn" @click="showModal">
      <img src="../../assets/add.png" alt />
    </a>

    <b-modal ref="my-modal" hide-footer title="Add Item">
      <div class="d-block text-center">
        <b-form @submit="onSubmit" @reset="onReset" v-if="show">
          <b-row>
            <b-col cols="2" class="form-name">
              <b-form-group id="input-group-1" label="Name :" label-for="input-1"></b-form-group>
            </b-col>
            <b-col cols="10">
              <b-form-input v-model="text" placeholder="Enter product name"></b-form-input>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="2" class="form-name">
              <b-form-group id="input-group-2" label="Image :" label-for="input-2"></b-form-group>
            </b-col>
            <b-col cols="10">
              <b-form-file v-model="file2" plain></b-form-file>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="2" class="form-name">
              <b-form-group id="input-group-3" label="Price :" label-for="input-3"></b-form-group>
            </b-col>
            <b-col cols="10">
              <b-form-input type="number" v-model="name" placeholder="Enter product price"></b-form-input>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="2" class="form-name">
              <b-form-group id="input-group-4" label="Category:" label-for="input-4"></b-form-group>
            </b-col>
            <b-col cols="10">
              <div>
                <b-form-select v-model="selected" :options="options" class="mb-3">
                  <!-- This slot appears above the options from 'options' prop -->
                  <template v-slot:first>
                    <b-form-select-option :value="null" disabled>-- Please select an option --</b-form-select-option>
                  </template>
                  <b-form-select-option value="C">Option C</b-form-select-option>
                  <b-form-select-option value="D">Option D</b-form-select-option>
                </b-form-select>
              </div>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="2" class="form-name">
              <b-form-group id="input-group-5" label="Status :" label-for="input-5"></b-form-group>
            </b-col>
            <b-col cols="10">
              <div class="text-left">
                <b-form-radio v-model="selected" name="some-radios" value="A">0</b-form-radio>
                <b-form-radio v-model="selected" name="some-radios" value="B">1</b-form-radio>
              </div>
            </b-col>
          </b-row>
        </b-form>
      </div>
      <b-button class="mt-3" variant="primary" block @click="hideModal">Print</b-button>
      <b-button
        class="mt-2"
        variant="warning"
        block
        @click="toggleModal"
        style="color: white;"
      >Send Email</b-button>
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
