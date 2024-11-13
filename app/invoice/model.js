const mongoose = require('mongoose');
const { model, Schema } = mongoose;

const invoiceSchema = Schema({
  sub_total: {
    type: Number,
    required: [true, 'sub total harus diisi'],
  },

  delivery_fee: {
    type: Number,
    required: [true, 'delivery fee harus diisi'],
  },

  delivery_address: {
    kelurahan: {
      type: String,
      required: [true, 'Kelurahan Harus Diisi'],
    },
    kecamatan: {
      type: String,
      required: [true, 'Kecamatan Harus Diisi'],
    },
    kabupaten: {
      type: String,
      required: [true, 'Kabupaten Harus Diisi'],
    },
    provinsi: {
      type: String,
      required: [true, 'Provinsi Harus Diisi'],
    },
    detail: {
      type: String,
    },
  },

  total: {
    type: Number,
    required: [true, 'delivery fee harus diisi'],
  },

  payment_status: {
    type: String,
    enum: ['waiting_payment', 'paid'],
    default: 'waiting_payment',
  },

  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },

  order: {
    type: Schema.Types.ObjectId,
    ref: 'Order',
  },
}, {timestamps: true});

module.exports = model('Invoice', invoiceSchema);
