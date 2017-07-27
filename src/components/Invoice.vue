<template>
  <div>
    <div>
      <v-btn v-if="groupedOrder.length > 1" @click.native.prevent="takeGrouped()">
        take grouped
      </v-btn>
    </div>
    <v-layout row wrap>
      <v-flex xs6 sm4 mb-4 v-for="invoice in invoices" :key="invoice.pesanan.id">
        <v-card class="white darken-2 black--text" style="position:relative;">
          <input type="checkbox" class="checkbox" v-model="groupedOrder" :value="invoice">
          <v-card-title primary-title>
            <div class="headline" style="width:100%;">{{ invoice.meja.no }} || {{ invoice.meja.nama }}</div>
            <div>
              Pesanan :
              <li v-for="order in invoice.pesanan_makanan">
                {{ order.nama }}
              </li>
            </div>
          </v-card-title>
          <v-card-actions>
            <v-btn flat outline dark block class="black--text"
            @click.native.prevent="$router.push('/invoice/' + invoice.pesanan.id)">
              Take
                <v-icon>keyboard_arrow_right</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
    
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  export default {
    data () {
      return {
        groupedOrder: []
      }
    },
    computed: {
      ...mapGetters([
        'invoices',
        'refreshInvoices',
        'groupedInvoice'
      ])
    },
    mounted () {
      this.$socket.emit('getDataOrders', {code: 2})
    },
    methods: {
      ...mapActions([
        'frefreshInvoices',
        'faddGroupInvoice'
      ]),
      takeGrouped () {
        this.faddGroupInvoice(this.groupedOrder)
        this.$router.push('/invoice-group')
      }
    },
    watch: {
      refreshInvoices () {
        if (this.refreshInvoices === true) {
          this.$socket.emit('getDataOrders', {code: 2})
          this.frefreshInvoices(false)
        }
      }
    }
  }
</script>

<style scoped>
  .checkbox {
    border:1px solid black;
    position: absolute;
    right: 5px;
    top: 5px;
    padding:50px;
  }
</style>
