<template>
  <b-container fluid class="bv-example-row">
    <b-row>
      <b-col
        cols="2"
        sm="2"
        md="1"
        lg="1"
        xl="1"
        class="default-container align-center pad-top-10 pad-left-10 menu-patty mt-1"
      >
        <b-icon-power class="logout h2"></b-icon-power>
      </b-col>
      <b-col
        cols="10"
        sm="10"
        md="11"
        lg="11"
        xl="11"
        class="text-center pt-1 box-shadow"
      >
        <h2>Category</h2>
      </b-col>
    </b-row>
    <b-row>
      <b-col
        cols="2"
        sm="2"
        md="1"
        lg="1"
        xl="1"
        class="default-container align-center box-shadow-nav side-navbar mt-3"
      >
        <b-row cols="1">
          <b-col class="pad-upside">
            <router-link to="/" v-b-tooltip.hover title="Home">
              <img src="../assets/fork.png" alt />
            </router-link>
          </b-col>
          <b-col class="pad-upside">
            <router-link to="/history" v-b-tooltip.hover title="History">
              <img src="../assets/clipboard.png" alt />
            </router-link>
          </b-col>
          <b-col class="pad-upside">
            <a href="#">
              <ModalAddCategory />
              <!-- <img src="../assets/add.png" alt /> -->
            </a>
          </b-col>
        </b-row>
      </b-col>
      <b-col cols="10" sm="10" md="11" lg="11" xl="11" class="pt-3">
        <b-container fluid>
          <!-- User Interface controls -->
          <b-row>
            <!-- FILTER -->
            <b-col lg="6" class="my-1 mb-4">
              <!-- <b-form-group label-for="filterInput" class="mb-0">
                <b-input-group size="sm">
                  <b-form-input
                    v-model="filter"
                    type="search"
                    id="filterInput"
                    placeholder="Type to Search"
                  ></b-form-input>
                  <b-input-group-append>
                    <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
                  </b-input-group-append>
                </b-input-group>
              </b-form-group>-->
            </b-col>
          </b-row>
          <b-table striped hover :items="items" :fields="fields">
            <template v-slot:cell(actions)="row">
              <b-button
                variant="success"
                size="sm"
                @click="info(row.item, row.index, $event.target)"
                class="mr-1"
              >
                <b-icon-pencil-square
                  @click="showModalEdit(row.item)"
                ></b-icon-pencil-square>
              </b-button>
              <b-button
                variant="danger"
                size="sm"
                @click="info(row.item, row.index, $event.target)"
                class="mr-1"
              >
                <b-icon-trash @click="showModalDelete(row.item)"></b-icon-trash>
              </b-button>
            </template>
          </b-table>

          <!-- <b-table
            show-empty
            small
            stacked="md"
            :items="items"
            :fields="fields"
            :filter="filter"
            :filterIncludedFields="filterOn"
            @filtered="onFiltered"
          >
            <template v-slot:cell(category_id)="fields">{{ fields.category_id }}</template>

            <template v-slot:cell(actions)="row">
              <b-button
                variant="success"
                size="sm"
                @click="info(row.item, row.index, $event.target)"
                class="mr-1"
              >
                <b-icon-pencil-square></b-icon-pencil-square>
              </b-button>
              <b-button
                variant="danger"
                size="sm"
                @click="info(row.item, row.index, $event.target)"
                class="mr-1"
              >
                <b-icon-trash></b-icon-trash>
              </b-button>
            </template>
          </b-table>-->
          <!-- <b-modal :id="infoModal.id" :title="infoModal.title" ok-only @hide="resetInfoModal"> -->
          <!-- <pre>{{ infoModal.content }}</pre> -->
          <!-- </b-modal> -->
          <b-modal ref="my-modal-edit" hide-footer title="Edit Product">
            <div class="d-block text-center">
              <b-form @submit="onSubmit" @reset="onReset" v-if="show">
                <b-row>
                  <b-col cols="2" class="form-name">
                    <b-form-group
                      id="input-group-1"
                      label="Name:"
                      label-for="input-1"
                    ></b-form-group>
                  </b-col>
                  <b-col cols="10">
                    <b-form-input
                      v-model="form.category_name"
                      placeholder="Enter category name"
                    ></b-form-input>
                  </b-col>
                </b-row>
              </b-form>
            </div>
            <b-button
              class="mt-3"
              variant="primary"
              block
              @click="
                hideModalEdit()
                editCategory()
              "
              >Confirm</b-button
            >
            <b-button
              class="mt-2"
              variant="danger"
              block
              @click="toggleModalEdit"
              style="color: white"
              >Cancel</b-button
            >
          </b-modal>
          <b-modal
            ref="my-modal-delete"
            hide-footer
            title="Confirmation Delete Product"
          >
            <div class="d-block text-center">
              Are you sure you want to delete this product ?
            </div>
            <b-row>
              <b-col cols="3" md="3"></b-col>
              <b-col cols="3" md="3">
                <b-button
                  class="mt-4"
                  variant="warning"
                  @click="toggleModalDelete"
                  style="color: white"
                  >Cancel</b-button
                >
              </b-col>
              <b-col cols="3" md="3">
                <b-button
                  class="mt-4"
                  variant="danger"
                  @click="
                    hideModalDelete()
                    delCategory()
                  "
                  >Confirm</b-button
                >
              </b-col>
            </b-row>
          </b-modal>
        </b-container>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import ModalAddCategory from './_base/ModalAddCategory'
// import axios from 'axios'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'MainCategory',
  data() {
    return {
      fields: ['ID', 'Name', 'Created', 'Updated', 'Actions'],
      items: [],
      infoModal: {
        id: 'info-modal',
        title: '',
        content: ''
      },
      // sortBy: '',
      filter: null,
      filterOn: [],
      form: {
        category_id: 0,
        category_name: this.category_name
      },
      show: true
    }
  },
  components: {
    // NavbarHistory
    ModalAddCategory
  },
  sortOptions() {
    // Create an options list from our fields
    return this.fields
      .filter((f) => f.sortable)
      .map((f) => {
        return { text: f.label, value: f.key }
      })
  },
  mounted() {
    // Set the initial number of items
    this.totalRows = this.items.length
  },
  created() {
    this.initiateCategory()
  },
  computed: {
    ...mapGetters({
      category: 'getCategory',
      category_id: 'getCategoryId',
      category_name: 'getCategoryName',
      category_created_at: 'getCategoryCreated',
      category_updated_at: 'getCategoryUpdated'
    })
  },
  methods: {
    ...mapActions({ getCategory: 'getCategories' }),
    ...mapActions(['patchCategory']),
    ...mapActions(['deleteCategory']),
    initiateCategory() {
      this.getCategory()
        .then((response) => {
          this.setTableItems()
        })
        .catch((error) => {
          console.log(error)
        })
    },
    setTableItems() {
      let newItems = []
      this.category.forEach((item) => {
        const data = {
          ID: item.category_id,
          Name: item.category_name,
          Created: new Date(item.category_created_at).toLocaleString(),
          Updated: new Date(item.category_updated_at).toLocaleString()
        }
        newItems = [...newItems, data]
      })
      this.items = newItems
    },
    info(item, index, button) {
      this.infoModal.title = 'Edit Category'
      this.infoModal.content = JSON.stringify(item, null, 2)
      this.$root.$emit('bv::show::modal', this.infoModal.id, button)
    },
    resetInfoModal() {
      this.infoModal.title = ''
      this.infoModal.content = ''
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },
    showModalEdit(item) {
      this.form.category_id = item.ID
      this.$refs['my-modal-edit'].show()
    },
    showModalDelete(item) {
      this.form.category_id = item.ID
      this.$refs['my-modal-delete'].show()
    },
    hideModalEdit() {
      this.$refs['my-modal-edit'].hide()
    },
    hideModalDelete() {
      this.$refs['my-modal-delete'].hide()
    },
    toggleModalEdit() {
      // We pass the ID of the button that we want to return focus to
      // when the modal has hidden
      this.$refs['my-modal-edit'].toggle('#toggle-btn')
    },
    toggleModalDelete() {
      // We pass the ID of the button that we want to return focus to
      // when the modal has hidden
      this.$refs['my-modal-delete'].toggle('#toggle-btn')
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
    editCategory() {
      this.patchCategory(this.form)
        .then((response) => {
          console.log(response)
          this.initiateCategory()
          this.makeToast(
            'success',
            `Category ${this.form.category_name} succesfully edited`
          )
        })
        .catch((error) => {
          console.log(error)
          this.makeToast(
            'danger',
            `Product ${this.form.product_name} failed to edit`
          )
        })
    },
    delCategory() {
      this.deleteCategory(this.form)
        .then((response) => {
          console.log(response)
          this.initiateCategory()
          this.makeToast(
            'success',
            `Category ${this.form.category_name} succesfully deleted`
          )
        })
        .catch((error) => {
          console.log(error)
          this.makeToast(
            'danger',
            `Category ${this.form.category_name} failed to delete`
          )
        })
    }
  }
}
</script>

<style scoped>
.height {
  height: 1700px;
  /* background-color: cornflowerblue; */
}

.main-content {
  background-color: rgba(190, 195, 202, 0.3);
}

.pad-upside {
  padding: 20px 13px;
}

.box-shadow-nav {
  box-shadow: 15px 0 15px -15px rgba(0, 0, 0, 0.25);
}

.empty-cart h5 {
  color: #cecece;
}

.pagination {
  align-items: center;
}

.container-sort {
  background-color: none;
}

/* =================================== */
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

.main-list {
  max-height: 500px;
  overflow-y: scroll;
  overflow-x: hidden;
}
.between-card {
  display: flex;
  justify-content: space-between;
}

.card1 {
  background: linear-gradient(
    278.29deg,
    #fbb2b4 30.05%,
    rgba(255, 143, 178, 0) 133.19%
  );
  width: 302px;
  height: 153px;
  filter: drop-shadow(10px 15px 10px rgba(255, 143, 178, 0.25));
  border-radius: 10px;
}

.card2 {
  width: 302px;
  height: 153px;
  background: linear-gradient(
    278.29deg,
    #29dfff 30.05%,
    rgba(41, 223, 255, 0) 133.19%
  );
  filter: drop-shadow(10px 15px 10px rgba(41, 223, 255, 0.25));
  border-radius: 10px;
}

.card3 {
  width: 302px;
  height: 153px;
  background: linear-gradient(
    278.29deg,
    #ab84c8 30.05%,
    rgba(241, 201, 236, 0) 133.19%
  );
  filter: drop-shadow(10px 15px 10px rgba(241, 201, 236, 0.25));
  border-radius: 10px;
}

.center-text {
  display: flex;
  flex-direction: column;
  text-align: left;
  padding: 40px 40px;
}
.center-text p {
  margin-bottom: 1px;
  font-weight: 500;
  font-size: 10pt;
}

.center-text h5 {
  margin-bottom: 1px;
}

.chart-container {
  margin-top: 40px;
  box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
}

.chart-style {
  padding: 20px;
}

.history-table {
  max-width: 1200px;
  overflow-x: scroll;
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
