export default {
  logged: false,
  loginCashierFeedback: null,
  invoices: [],
  refreshInvoices: null,
  invoice: {
    meja: {
      id: null,
      no: null,
      nama: null,
      keterangan: null
    },
    pesanan_makanan: [
      {
        id: null,
        nama: null,
        harga: null,
        waktu: null,
        jumlah: null
      }
    ],
    pesanan: {
      id: null,
      status_pembayaran: null,
      status_dapur: null,
      keterangan: null,
      user_id: null,
      created_at: null
    }
  },
  payedStatusFromSocket: {
    id: null,
    meja: null,
    status: false
  },
  payedGroupedStatusFromSocket: false,
  groupedInvoice: []
}
