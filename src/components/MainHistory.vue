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
        <h2>History</h2>
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
        <!-- =======Card============= -->
        <b-row align-h="between">
          <b-col cols="12" sm="12" md="4" lg="4" xl="4" class="pt-3">
            <div class="card1">
              <div class="center-text">
                <p>Today's Income</p>
                <h5>{{ formatCurrency(todayIncome) }}</h5>
                <p>
                  {{ incomeIncrease }} Yesterday ({{
                  formatCurrency(yesterdayIncome)
                  }})
                </p>
              </div>
            </div>
          </b-col>
          <b-col cols="12" sm="12" md="4" lg="4" xl="4" class="pt-3">
            <div class="card2">
              <div class="center-text">
                <p>Orders</p>
                <h5>{{ countOrder }}</h5>
                <p>
                  {{ orderIncrease }} Last Week ({{ lastWeekCountOrder }}
                  orders)
                </p>
              </div>
            </div>
          </b-col>
          <b-col cols="12" sm="12" md="4" lg="4" xl="4" class="pt-3">
            <div class="card3">
              <div class="center-text">
                <p>This Year's Income</p>
                <h5>{{ formatCurrency(yearlyIncome) }}</h5>
                <p>
                  {{ lastYearIncrease }} Last Year ({{
                  formatCurrency(lastYearIncome)
                  }})
                </p>
              </div>
            </div>
          </b-col>
        </b-row>
        <!-- =======Card============= -->
        <!-- =======Chart============= -->
        <div class="chart-container">
          <div class="chart-style">
            <b-row align-h="between">
              <b-col cols="3">
                <h3>Revenue</h3>
              </b-col>
              <b-col cols="3">
                <b-form-select v-model="chartFilter" :options="optionsChart" class="mb-3"></b-form-select>
              </b-col>
            </b-row>
            <line-chart :data="chartData"></line-chart>
          </div>
        </div>

        <!-- =======Chart============= -->
        <!-- =======Table============= -->
        <div class="chart-container">
          <div class="chart-style">
            <b-row align-h="between">
              <b-col cols="3">
                <h3>Recent Order</h3>
              </b-col>
              <b-col cols="3">
                <b-form-select v-model="filter" :options="optionsFilter" class="mb-3"></b-form-select>
              </b-col>
            </b-row>
            <b-table class="table-responsive" striped hover :items="items" :fields="fields"></b-table>
          </div>
        </div>
        <!-- =======Table============= -->
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import ModalMenu from './_base/ModalMenu'
import axios from 'axios'

export default {
  name: 'MainHistory',
  data() {
    return {
      // Note `isActive` is left out and will not appear in the rendered table
      fields: ['invoice', 'cashier', 'date', 'orders', 'amount'],
      items: [],
      chartData: {},
      chartFilter: 'month',
      optionsChart: [
        { value: 'month', text: 'This Month' },
        { value: 'year', text: 'This Year' }
      ],
      filter: 'today',
      optionsFilter: [
        { value: 'today', text: 'All' },
        { value: 'week', text: 'This Week' }
      ],
      todayIncome: 0,
      yesterdayIncome: 0,
      incomeIncrease: '',
      countOrder: 0,
      lastWeekCountOrder: 0,
      orderIncrease: '',
      yearlyIncome: 0,
      lastYearIncome: 0,
      lastYearIncrease: 0
    }
  },
  components: {
    // NavbarHistory
    ModalMenu
  },
  created() {
    this.getHistory()
    this.getTodayIncome()
    this.getYesterdayIncome()
    this.getCountOrder()
    this.getLastWeekCountOrder()
    this.getMonthlyIncomeData()
    this.getYearIncome()
    this.getLastYearIncome()
  },
  methods: {
    getHistory() {
      axios
        .get('http://127.0.0.1:3001/history/')
        .then((response) => {
          response.data.data.forEach((item) => {
            let orders = ''
            item.orders.forEach((element) => {
              orders += `${element.product_name} x${element.quantity}, `
            })
            const data = {
              invoice: item.details.invoice,
              cashier: 'Pevita Pearce',
              date: new Date(item.details.history_created_at).toLocaleString(),
              orders: orders,
              amount: this.formatCurrency(item.details.history_subtotal)
            }
            this.items = [...this.items, data]
          })
        })
        .catch((error) => {
          console.log(error)
        })
    },
    getTodayIncome() {
      const date = new Date().toISOString().slice(0, 10)
      // console.log(date)
      axios
        .post('http://127.0.0.1:3001/history/income/today', { date }, {})
        .then((response) => {
          this.todayIncome = response.data.data[0].daily_income
        })
        .catch((error) => {
          console.log(error)
        })
    },
    getYesterdayIncome() {
      const d = new Date()
      d.setDate(d.getDate() - 1)
      const date = d.toISOString().slice(0, 10)

      // console.log(date)
      axios
        .post('http://127.0.0.1:3001/history/income/today', { date }, {})
        .then((response) => {
          this.yesterdayIncome = response.data.data[0].daily_income
          if (this.yesterdayIncome) {
            const increase =
              ((this.todayIncome - this.yesterdayIncome) /
                this.yesterdayIncome) *
              100
            if (increase >= 0) {
              this.incomeIncrease = `+${increase.toFixed(3)}%`
            } else {
              this.incomeIncrease = `-${increase.toFixed(3)}%`
            }
          } else {
            this.yesterdayIncome = 0
            this.incomeIncrease = ''
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },
    formatCurrency(number) {
      return number.toLocaleString('ID-JK', {
        style: 'currency',
        currency: 'IDR'
      })
    },
    getCountOrder() {
      const date = new Date().toISOString().slice(0, 10)
      console.log(date)
      axios
        .post('http://127.0.0.1:3001/history/count/order', { date }, {})
        .then((response) => {
          this.countOrder = response.data.data[0].count_order
        })
        .catch((error) => {
          console.log(error)
        })
    },
    getLastWeekCountOrder() {
      const d = new Date()
      d.setDate(d.getDate() - 7)
      const date = d.toISOString().slice(0, 10)
      console.log(date)
      axios
        .post('http://127.0.0.1:3001/history/count/order', { date }, {})
        .then((response) => {
          this.lastWeekCountOrder = response.data.data[0].count_order
          if (this.lastWeekCountOrder) {
            const increase =
              ((this.countOrder - this.lastWeekCountOrder) /
                this.lastWeekCountOrder) *
              100
            if (increase >= 0) {
              this.orderIncrease = `+${increase.toFixed(3)}%`
            } else {
              this.orderIncrease = `-${increase.toFixed(3)}%`
            }
          } else {
            this.lastWeekCountOrder = 0
            this.orderIncrease = ''
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },
    getMonthlyIncomeData() {
      const date = new Date().toISOString().slice(0, 10)
      // console.log(date)
      axios
        .post('http://127.0.0.1:3001/history/income/month', { date }, {})
        .then((response) => {
          const monthlyIncomeData = response.data.data

          const jsonData = {}
          monthlyIncomeData.forEach((item) => {
            var columnName = item.date
            if (item.income.length) {
              jsonData[columnName] = item.income[0].daily_income
            } else {
              jsonData[columnName] = 0
            }
          })

          this.chartData = jsonData
        })
        .catch((error) => {
          console.log(error)
        })
    },
    getYearIncome() {
      const date = new Date().toISOString().slice(0, 10)
      // console.log(date)
      axios
        .post('http://127.0.0.1:3001/history/income/year', { date }, {})
        .then((response) => {
          this.yearlyIncome = response.data.data[0].yearly_income
        })
        .catch((error) => {
          console.log(error)
        })
    },
    getLastYearIncome() {
      const d = new Date()
      d.setDate(d.getDate() - 365)
      const date = d.toISOString().slice(0, 10)

      // console.log(date)
      axios
        .post('http://127.0.0.1:3001/history/income/year', { date }, {})
        .then((response) => {
          this.lastYearIncome = response.data.data[0].yearly_income
          if (this.lastYearIncome) {
            const increase =
              ((this.yearlyIncome - this.lastYearIncome) /
                this.lastYearIncome) *
              100
            if (increase >= 0) {
              this.lastYearIncrease = `+${increase.toFixed(3)}%`
            } else {
              this.lastYearIncrease = `-${increase.toFixed(3)}%`
            }
          } else {
            this.lastYearIncome = 0
            this.lastYearIncrease = ''
          }
        })
        .catch((error) => {
          console.log(error)
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
