const mongoose = require('mongoose');
const { model, Schema } = mongoose;

const deliveryAddressSchema = Schema(
  {
    name: {
      type: String,
      required: [true, 'Nama Alamat Harus Diisi'],
      maxLength: [225, 'panjang maksimal nama alamat 225 karakter'],
    },
    kelurahan: {
      type: String,
      required: [true, 'Kelurahan Harus Diisi'],
      maxLength: [225, 'panjang maksimal nama alamat 225 karakter'],
    },
    kecamatan: {
      type: String,
      required: [true, 'Kecamatan Harus Diisi'],
      maxLength: [225, 'panjang maksimal nama alamat 225 karakter'],
    },
    kabupaten: {
      type: String,
      required: [true, 'Kabupaten Harus Diisi'],
      maxLength: [225, 'panjang maksimal nama alamat 225 karakter'],
    },
    provinsi: {
      type: String,
      required: [true, 'Provinsi Harus Diisi'],
      maxLength: [225, 'panjang maksimal nama alamat 225 karakter'],
    },
    detail: {
      type: String,
      required: [true, 'Detail Alamat Harus Diisi'],
      maxLength: [1000, 'panjang maksimal nama alamat 225 karakter'],
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model('DeliveryAddress' ,deliveryAddressSchema)
