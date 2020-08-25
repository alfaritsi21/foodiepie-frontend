<template>
  <b-container class="bv-example-row container-sort">
    <b-row>
      <b-col cols="4" md="8"></b-col>
      <b-col cols="3" md="2">
        <b-dropdown variant="none" id="dropdown-1" text="Sort by" class="m-md-2 mb-2 pl-0 pr-0">
          <b-dropdown-item>First Action</b-dropdown-item>
          <b-dropdown-item>Second Action</b-dropdown-item>
        </b-dropdown>
      </b-col>
      <b-col cols="3" md="2">
        <b-dropdown variant="none" id="dropdown-2" text="Order by" class="m-md-2">
          <b-dropdown-item>First Action</b-dropdown-item>
          <b-dropdown-item>Second Action</b-dropdown-item>
        </b-dropdown>
      </b-col>
    </b-row>
  </b-container>
</template>

<style scoped>
.container-sort {
  background-color: none;
}
</style>
