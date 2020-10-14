import axios from 'axios'

export default {
  state: {
    urlApi: process.env.VUE_APP_URL,
    historyData: [],
    chartData: {},
    todayIncomeData: 0,
    yesterdayIncomeData: 0,
    countOrderData: 0,
    lastWeekCountOrderData: 0,
    yearlyIncomeData: 0,
    lastYearIncomeData: 0,
    historyDataPost: {
      invoiceData: '',
      ordersData: []
    }
  },
  mutations: {
    setHistory(state, payload) {
      state.historyData = payload
    },
    setChartData(state, payload) {
      state.chartData = payload
    },
    setTodayIncome(state, payload) {
      state.todayIncomeData = payload
    },
    setYesterdayIncome(state, payload) {
      state.yesterdayIncomeData = payload
    },
    setCountOrderData(state, payload) {
      state.countOrderData = payload
    },
    setLastWeekCountOrderData(state, payload) {
      state.lastWeekCountOrderData = payload
    },
    setYearlyIncome(state, payload) {
      state.yearlyIncomeData = payload
    },
    setLastYearIncome(state, payload) {
      state.lastYearIncomeData = payload
    },
    setInvoice(state, payload) {
      state.historyDataPost.invoiceData = payload
    },
    setOrder(state, payload) {
      state.historyDataPost.ordersData = payload
    }
  },
  actions: {
    getHistories(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .get(`${context.state.urlApi}history`)
          .then(response => {
            let items = []
            response.data.data.forEach(item => {
              let orders = ''
              item.orders.forEach(element => {
                orders += `${element.product_name} x${element.quantity}, `
              })
              const data = {
                invoice: item.details.invoice,
                cashier: 'Pevita Pearce',
                date: new Date(
                  item.details.history_created_at
                ).toLocaleString(),
                orders: orders,
                amount: item.details.history_subtotal
              }
              items = [...items, data]
            })
            context.commit('setHistory', items)
            console.log(items)
          })
          .catch(error => {
            console.log(error)
          })
      })
    },
    getTodayIncomes(context, payload) {
      const date = new Date().toISOString().slice(0, 10)
      return new Promise((resolve, reject) => {
        axios
          .post(
            `${context.state.urlApi}history/income/today`,
            { date },
            payload
          )
          .then(response => {
            console.log(response.data.data[0].daily_income)
            resolve(response.data.data[0].daily_income)

            const todayIncome = response.data.data[0].daily_income
            context.commit('setTodayIncome', todayIncome)
          })
          .catch(error => {
            console.log(error.response)
            reject(error.response.msg)
          })
      })
    },
    getYesterdayIncomes(context, payload) {
      const d = new Date()
      d.setDate(d.getDate() - 1)
      const date = d.toISOString().slice(0, 10)
      return new Promise((resolve, reject) => {
        axios
          .post(
            `${context.state.urlApi}history/income/today`,
            { date },
            payload
          )
          .then(response => {
            console.log(response.data.data[0].daily_income)
            resolve(response.data.data[0].daily_income)
            const yesterdayIncome = response.data.data[0].daily_income

            context.commit('setYesterdayIncome', yesterdayIncome)
          })
          .catch(error => {
            console.log(error.response)
            reject(error.response.msg)
          })
      })
    },
    getCountOrders(context, payload) {
      const date = new Date().toISOString().slice(0, 10)
      return new Promise((resolve, reject) => {
        axios
          .post(`${context.state.urlApi}history/count/order`, { date }, payload)
          .then(response => {
            console.log(response.data.data[0].count_order)
            resolve(response.data.data[0].count_order)

            const countOrder = response.data.data[0].count_order
            context.commit('setCountOrderData', countOrder)
          })
          .catch(error => {
            console.log(error.response)
            reject(error.response.msg)
          })
      })
    },
    getLastWeekCountOrders(context, payload) {
      const d = new Date()
      d.setDate(d.getDate() - 7)
      const date = d.toISOString().slice(0, 10)
      return new Promise((resolve, reject) => {
        axios
          .post(`${context.state.urlApi}history/count/order`, { date }, payload)
          .then(response => {
            console.log(response.data.data[0].count_order)
            resolve(response.data.data[0].count_order)

            const lastWeekCountOrder = response.data.data[0].count_order
            context.commit('setLastWeekCountOrderData', lastWeekCountOrder)
          })
          .catch(error => {
            console.log(error.response)
            reject(error.response.msg)
          })
      })
    },
    getMonthlyIncomeDatas(context, payload) {
      const date = new Date().toISOString().slice(0, 10)
      return new Promise((resolve, reject) => {
        axios
          .post(
            `${context.state.urlApi}history/income/month`,
            { date },
            payload
          )
          .then(response => {
            let chartData = {}
            const monthlyIncomeData = response.data.data
            console.log(monthlyIncomeData)

            const jsonData = {}
            monthlyIncomeData.forEach(item => {
              var columnName = item.date
              if (item.income.length) {
                jsonData[columnName] = item.income[0].daily_income
              } else {
                jsonData[columnName] = 0
              }
            })
            console.log(jsonData)

            chartData = jsonData

            context.commit('setChartData', chartData)
          })
          .catch(error => {
            console.log(error.response)
            reject(error.response.msg)
          })
      })
    },
    getYearIncomes(context, payload) {
      const date = new Date().toISOString().slice(0, 10)
      return new Promise((resolve, reject) => {
        axios
          .post(`${context.state.urlApi}history/income/year`, { date }, payload)
          .then(response => {
            console.log(response.data.data[0].yearly_income)
            resolve(response.data.data[0].yearly_income)

            const yearIncome = response.data.data[0].yearly_income
            context.commit('setYearlyIncome', yearIncome)
          })
          .catch(error => {
            console.log(error.response)
            reject(error.response.msg)
          })
      })
    },
    getLastYearIncomes(context, payload) {
      const d = new Date()
      d.setDate(d.getDate() - 365)
      const date = d.toISOString().slice(0, 10)
      return new Promise((resolve, reject) => {
        axios
          .post(`${context.state.urlApi}history/income/year`, { date }, payload)
          .then(response => {
            console.log(response.data.data[0].yearly_income)
            resolve(response.data.data[0].yearly_income)

            const lastYearIncome = response.data.data[0].yearly_income
            context.commit('setLastYearIncome', lastYearIncome)
          })
          .catch(error => {
            console.log(error.response)
            reject(error.response.msg)
          })
      })
    },
    getHistoryInvoice(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .get(`${context.state.urlApi}history`)
          .then(response => {
            const invoice = response.data.data.invoice
            context.commit('setInvoice', invoice)
          })
          .catch(error => {
            console.log(error)
          })
      })
    }
    // postHistories(context, payload) {
    //   return new Promise((resolve, reject) => {
    //     axios
    //       .post(
    //         `${context.state.urlApi}history`,
    //         context.state.historyDataPost,
    //         {}
    //       )
    //       .then(response => {
    //         console.log('berhasil')
    //         context.commit('setInvoice')
    //         context.commit('setOrder')
    //       })
    //       .catch(error => {
    //         console.log(error)
    //         console.log('gagal')
    //       })
    //   })
    // }
  },
  getters: {
    getHistoryData(state) {
      return state.historyData
    },
    getChartData(state) {
      return state.chartData
    },
    getTodayIncomeData(state) {
      return state.todayIncomeData
    },
    getYesterdayIncomeData(state) {
      return state.yesterdayIncomeData
    },
    getcountOrderData(state) {
      return state.countOrderData
    },
    getLastWeekCountOrderData(state) {
      return state.lastWeekCountOrderData
    },
    getYearlyIncomeData(state) {
      return state.yearlyIncomeData
    },
    getLastYearIncomeData(state) {
      return state.lastYearIncomeData
    },
    getInvoiceData(state) {
      return state.historyDataPost.invoiceData
    },
    getOrderData(state) {
      return state.historyDataPost.ordersData
    }
  }
}
