import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard'
import Invoice from '@/components/Invoice'
import SingleInvoice from '@/components/SingleInvoice.vue'
import InvoiceGroup from '@/components/SingleGrouped.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Dashboard,
      children: [
        {
          path: '/invoice',
          component: Invoice
        },
        {
          path: '/invoice/:id',
          component: SingleInvoice
        },
        {
          path: '/invoice-group',
          component: InvoiceGroup
        }
      ]
    }
  ]
})
