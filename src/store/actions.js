import * as mutation from './mutation-types.js'

export default {
  changeLogged (context, param) {
    context.commit(mutation.CHANGE_LOGGED, param)
  },
  frefreshInvoices (context, status) {
    context.commit(mutation.FREFRESH_INVOICES, status)
  },
  fchangePayedStatusFromSocket (context, status) {
    context.commit(mutation.FCHANGE_PAYED_STATUS_FROM_SOCKET, status)
  },
  faddGroupInvoice (context, data) {
    context.commit(mutation.FADD_GROUP_INVOICES, data)
  }
}

