export default {
  logged: state => {
    return state.logged
  },
  LoginCashierFeedback: state => {
    return state.LoginCashierFeedback
  },
  invoices: state => {
    return state.invoices
  },
  refreshInvoices: state => {
    return state.refreshInvoices
  },
  invoice: state => {
    return state.invoice
  },
  payedStatusFromSocket: state => {
    return state.payedStatusFromSocket
  },
  payedGroupedStatusFromSocket: state => {
    return state.payedGroupedStatusFromSocket
  },
  groupedInvoice: state => {
    return state.groupedInvoice
  }
}
