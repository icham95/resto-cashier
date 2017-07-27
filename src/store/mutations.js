import * as mutations from './mutation-types'

import Vue from 'vue'
import VueLocalStorage from 'vue-localstorage'

Vue.use(VueLocalStorage)

export default {
  [mutations.SOCKET_LOGINCASHIERFEEDBACK] (state, data) {
    if (data.success === false) {
      state.logged = 'rejected'
    } else {
      data.logged = true
      Vue.localStorage.set('dataUserLevel', data)
      state.logged = true
    }
    state.loginCashierFeedback = data
  },
  [mutations.CHANGE_LOGGED] (state, data) {
    state.logged = data
  },
  [mutations.SOCKET_SENDORDERSFROMWAITERFEEDBACK] (state, data) {
    console.log('retrieve order from waiter')
    if (data.success === true) {
      state.refreshInvoices = true
    }
  },
  [mutations.SOCKET_GETDATAORDERSFEEDBACK] (state, datas) {
    if (datas.success === true && datas.code === 2) {
      let temp = []
      for (let i = 0; i < datas.body.length; i++) {
        if (datas.body[i] !== null) {
          temp.push(datas.body[i])
        }
      }
      state.invoices = temp
    }
  },
  [mutations.FREFRESH_INVOICES] (state, status) {
    state.refreshInvoices = status
  },
  [mutations.SOCKET_GETDATAORDERFEEDBACK] (state, datas) {
    if (datas.success === true) {
      let temp = []
      for (let i = 0; i < datas.body.length; i++) {
        if (datas.body[i] !== null) {
          temp.push(datas.body[i])
          temp.total = 'oke'
        }
      }
      state.invoice = temp[0]
    }
  },
  [mutations.SOCKET_PAYFROMCASHIERFEEDBACK] (state, datas) {
    if (datas.success === true) {
      state.payedStatusFromSocket = {
        status: true,
        meja: datas.meja,
        id: datas.id
      }
    }
  },
  [mutations.FCHANGE_PAYED_STATUS_FROM_SOCKET] (state, status) {
    state.payedStatusFromSocket.status = status
  },
  [mutations.FADD_GROUP_INVOICES] (state, data) {
    state.groupedInvoice = data
  }
}
