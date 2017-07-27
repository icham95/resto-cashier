<template>
  <div>
    <v-layout row wrap>
      <v-flex xs8 sm8>
        <v-card class="white darken-2 black--text" v-for="invoice in groupedInvoice" :key="invoice.pesanan.id" style="margin-bottom:15px;">
          <v-card-title primary-title>
            <div class="headline" style="width:100%;">Meja {{ invoice.meja.no }} || {{ invoice.meja.nama }}</div>
            <div style="width:100%;">
              at : {{ invoice.pesanan.created_at }}
              <br>
              status pembayaran : 
              <div v-if="invoice.pesanan.status_pembayaran === 1" style="display:inline">
                Belum di bayar
              </div>
              <div v-else style="display:inline">
                Terbayar
              </div>
              <br>
              waiter : {{ invoice.pesanan.user_id }}
            </div>
            <div>
              Pesanan :
              <li v-for="order in invoice.pesanan_makanan">
                {{ order.nama }} || jumlah : {{ order.jumlah }} || harga : {{ order.harga }}
              </li>
              <div>
                keterangan : <br>
                {{ invoice.pesanan.keterangan }}
              </div>
            </div>
          </v-card-title>
        </v-card>
      </v-flex>

      <v-flex xs4 sm4>
        <v-card class="white darken-2 black--text">
          <v-card-title primary-title>
            <div class="headline" style="width:100%;">Total</div>
            <div>
              <li v-for="total in totalHarga">  
                {{ total.nama }} || {{ total.jumlah }} || {{ total.harga }} || {{ total.total }} 
              </li>
              <v-divider></v-divider>
              totalled :
              <h5 style="text-align:center">{{ toRp(totalled) }}</h5>
              cash :
              <h5 style="text-align:center">{{ toRp(priced) }}</h5>
              totalled all : 
              <h5 style="text-align:center">{{ toRp(totalledAll) }}</h5>
              <v-divider></v-divider>
              <v-text-field
                label="Cash"
                v-model="priced"
              ></v-text-field>
            </div>
          </v-card-title>
          <v-card-actions>
            <v-btn flat outline dark block class="black--text" @click.native.prevent="pay()">
              Pay
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
        totalHarga: [],
        priced: 0,
        totalled: 0
      }
    },
    computed: {
      ...mapGetters([
        'groupedInvoice',
        'payedGroupedStatusFromSocket'
      ]),
      totalledAll () {
        if (this.priced === '') this.priced = 0
        return this.priced - this.totalled
      }
    },
    methods: {
      ...mapActions([
        'fchangePayedGroupedStatusFromSocket'
      ]),
      total () {
        this.totalHarga = []
        let temp = {}
        let total = 0
        let totalPerOrder = 0
        for (let i = 0; i < this.invoice.pesanan_makanan.length; i++) {
          let order = this.invoice.pesanan_makanan[i]
          totalPerOrder = order.harga * order.jumlah
          total += totalPerOrder
          temp = {
            nama: order.nama,
            jumlah: order.jumlah,
            harga: order.harga,
            total: totalPerOrder
          }
          this.totalHarga.push(temp)
          if (i === this.invoice.pesanan_makanan.length - 1) {
            this.totalHarga.total = total
          }
        }
        return this.totalHarga
      },
      pay () {
        let data = []
        let grouped = this.groupedInvoice
        for (let i = 0; i < grouped.length; i++) {
          data.push({
            id: grouped[i].pesanan.id,
            statusPembayaran: 2,
            meja: {
              nama: grouped[i].meja.nama,
              no: grouped[i].meja.no
            }
          })
        }
        if (this.totalledAll >= 0) {
          this.$socket.emit('payGroupedFromCashier', data)
        } else {
          this.$notify({
            title: 'Pesan',
            type: 'error',
            text: 'pembayaran kurang ' + this.totalledAll
          })
        }
      },
      toRp (angka, type = 0) {
        let rev = parseInt(angka, 10).toString().split('').reverse().join('')
        let rev2 = ''
        for (let i = 0; i < rev.length; i++) {
          rev2 += rev[i]
          if ((i + 1) % 3 === 0 && i !== (rev.length - 1)) {
            rev2 += '.'
          }
        }
        if (type === 0) {
          return 'Rp. ' + rev2.split('').reverse().join('') + ',00'
        } else {
          return rev2.split('').reverse().join('')
        }
      }
    },
    watch: {
      payedGroupedStatusFromSocket () {
        let payed = this.payedGroupedStatusFromSocket
        if (payed === true) {
          this.$notify({
            title: 'Pesan',
            text: `pembayaran berhasil`
          })
          this.fchangePayedGroupedStatusFromSocket(false)
        }
      },
      invoice () {
        this.total()
      }
    },
    mounted () {
      this.totalled = 0
      let grouped = this.groupedInvoice
      for (let i = 0; i < grouped.length; i++) {
        let pesananMakanan = grouped[i].pesanan_makanan
        for (let x = 0; x < pesananMakanan.length; x++) {
          this.totalled += (pesananMakanan[x].harga * pesananMakanan[x].jumlah)
        }
      }
    }
  }
</script>
