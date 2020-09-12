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
        <img src="../assets/menu-patty1.png" alt />
      </b-col>
      <b-col cols="10" sm="10" md="11" lg="11" xl="11" class="text-center pt-1 box-shadow">
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
            <a href="/">
              <img src="../assets/fork.png" alt />
            </a>
          </b-col>
          <b-col class="pad-upside">
            <a href="history">
              <img src="../assets/clipboard.png" alt />
            </a>
          </b-col>
          <b-col class="pad-upside">
            <a href="#">
              <ModalMenu />
              <!-- <img src="../assets/add.png" alt /> -->
            </a>
          </b-col>
        </b-row>
      </b-col>
      <b-col cols="10" sm="10" md="11" lg="11" xl="11" class="pt-3">
        <b-container fluid>
          <!-- User Interface controls -->
          <b-row>
            <b-col lg="6" class="my-1">
              <b-form-group
                label="Sort"
                label-cols-sm="3"
                label-align-sm="right"
                label-size="sm"
                label-for="sortBySelect"
                class="mb-0"
              >
                <b-input-group size="sm">
                  <b-form-select
                    v-model="sortBy"
                    id="sortBySelect"
                    :options="sortOptions"
                    class="w-75"
                  >
                    <template v-slot:first>
                      <option value>-- none --</option>
                    </template>
                  </b-form-select>
                  <b-form-select v-model="sortDesc" size="sm" :disabled="!sortBy" class="w-25">
                    <option :value="false">Asc</option>
                    <option :value="true">Desc</option>
                  </b-form-select>
                </b-input-group>
              </b-form-group>
            </b-col>

            <b-col lg="6" class="my-1">
              <b-form-group
                label="Initial sort"
                label-cols-sm="3"
                label-align-sm="right"
                label-size="sm"
                label-for="initialSortSelect"
                class="mb-0"
              >
                <b-form-select
                  v-model="sortDirection"
                  id="initialSortSelect"
                  size="sm"
                  :options="['asc', 'desc', 'last']"
                ></b-form-select>
              </b-form-group>
            </b-col>

            <b-col lg="6" class="my-1">
              <b-form-group
                label="Filter"
                label-cols-sm="3"
                label-align-sm="right"
                label-size="sm"
                label-for="filterInput"
                class="mb-0"
              >
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
              </b-form-group>
            </b-col>

            <b-col lg="6" class="my-1">
              <b-form-group
                label="Filter On"
                label-cols-sm="3"
                label-align-sm="right"
                label-size="sm"
                description="Leave all unchecked to filter on all data"
                class="mb-0"
              >
                <b-form-checkbox-group v-model="filterOn" class="mt-1">
                  <b-form-checkbox value="name">Name</b-form-checkbox>
                  <b-form-checkbox value="age">Age</b-form-checkbox>
                  <b-form-checkbox value="isActive">Active</b-form-checkbox>
                </b-form-checkbox-group>
              </b-form-group>
            </b-col>

            <b-col sm="5" md="6" class="my-1">
              <b-form-group
                label="Per page"
                label-cols-sm="6"
                label-cols-md="4"
                label-cols-lg="3"
                label-align-sm="right"
                label-size="sm"
                label-for="perPageSelect"
                class="mb-0"
              >
                <b-form-select
                  v-model="perPage"
                  id="perPageSelect"
                  size="sm"
                  :options="pageOptions"
                ></b-form-select>
              </b-form-group>
            </b-col>

            <b-col sm="7" md="6" class="my-1">
              <b-pagination
                v-model="currentPage"
                :total-rows="totalRows"
                :per-page="perPage"
                align="fill"
                size="sm"
                class="my-0"
              ></b-pagination>
            </b-col>
          </b-row>

          <!-- Main table element -->
          <b-table
            show-empty
            small
            stacked="md"
            :items="items"
            :fields="fields"
            :current-page="currentPage"
            :per-page="perPage"
            :filter="filter"
            :filterIncludedFields="filterOn"
            :sort-by.sync="sortBy"
            :sort-desc.sync="sortDesc"
            :sort-direction="sortDirection"
            @filtered="onFiltered"
          >
            <template v-slot:cell(name)="row">{{ row.value.first }} {{ row.value.last }}</template>

            <template v-slot:cell(actions)="row">
              <b-button
                size="sm"
                @click="info(row.item, row.index, $event.target)"
                class="mr-1"
              >Info modal</b-button>
              <b-button
                size="sm"
                @click="row.toggleDetails"
              >{{ row.detailsShowing ? 'Hide' : 'Show' }} Details</b-button>
            </template>

            <template v-slot:row-details="row">
              <b-card>
                <ul>
                  <li v-for="(value, key) in row.item" :key="key">{{ key }}: {{ value }}</li>
                </ul>
              </b-card>
            </template>
          </b-table>

          <!-- Info modal -->
          <b-modal :id="infoModal.id" :title="infoModal.title" ok-only @hide="resetInfoModal">
            <pre>{{ infoModal.content }}</pre>
          </b-modal>
        </b-container>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import ModalMenu from './_base/ModalMenu'
// import axios from 'axios'

export default {
  name: 'MainHistory',
  data() {
    return {
      items: [
        {
          isActive: true,
          age: 40,
          name: { first: 'Dickerson', last: 'Macdonald' }
        },
        { isActive: false, age: 21, name: { first: 'Larsen', last: 'Shaw' } },
        {
          isActive: false,
          age: 9,
          name: { first: 'Mini', last: 'Navarro' },
          _rowVariant: 'success'
        },
        { isActive: false, age: 89, name: { first: 'Geneva', last: 'Wilson' } },
        { isActive: true, age: 38, name: { first: 'Jami', last: 'Carney' } },
        { isActive: false, age: 27, name: { first: 'Essie', last: 'Dunlap' } },
        { isActive: true, age: 40, name: { first: 'Thor', last: 'Macdonald' } },
        {
          isActive: true,
          age: 87,
          name: { first: 'Larsen', last: 'Shaw' },
          _cellVariants: { age: 'danger', isActive: 'warning' }
        },
        { isActive: false, age: 26, name: { first: 'Mitzi', last: 'Navarro' } },
        {
          isActive: false,
          age: 22,
          name: { first: 'Genevieve', last: 'Wilson' }
        },
        { isActive: true, age: 38, name: { first: 'John', last: 'Carney' } },
        { isActive: false, age: 29, name: { first: 'Dick', last: 'Dunlap' } }
      ],
      fields: [
        {
          key: 'name',
          label: 'Person Full name',
          sortable: true,
          sortDirection: 'desc'
        },
        {
          key: 'age',
          label: 'Person age',
          sortable: true,
          class: 'text-center'
        },
        {
          key: 'isActive',
          label: 'is Active',
          formatter: (value, key, item) => {
            return value ? 'Yes' : 'No'
          },
          sortable: true,
          sortByFormatted: true,
          filterByFormatted: true
        },
        { key: 'actions', label: 'Actions' }
      ],
      totalRows: 1,
      currentPage: 1,
      perPage: 5,
      pageOptions: [5, 10, 15],
      sortBy: '',
      sortDesc: false,
      sortDirection: 'asc',
      filter: null,
      filterOn: [],
      infoModal: {
        id: 'info-modal',
        title: '',
        content: ''
      }
    }
  },
  components: {
    // NavbarHistory
    ModalMenu
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
  methods: {
    info(item, index, button) {
      this.infoModal.title = `Row index: ${index}`
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
