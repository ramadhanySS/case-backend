const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const orderItemSchema = Schema({
  name: {
    type: String,
    required: [true, 'nama must be filled'],
    minlength: [3, 'Panjang makanan minimal 3 karakter'],
  },

  price: {
    type: Number,
    required: [true, 'Harga item harus diisi'],
  },

  qty: {
    type: Number,
    required: [true, 'qty harus diisi'],
    min: [1, 'minimal qty adalah 1'],
  },

  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
  },

  order: {
    type: Schema.Types.ObjectId,
    ref: 'Order',
  },
});

module.exports = model('OrderItem', orderItemSchema)
