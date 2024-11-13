const mongoose = require('mongoose');
const { model, Schema } = mongoose;

const productSchema = Schema(
  {
    name: {
      type: String,
      required: [true, 'field makanan harus ada'],
      minlength: [3, 'Panjang makanan minimal 3 karakter'],
      maxlength: 50,
    },
    deskripsi: {
      type: String,
      maxlength: [1000, 'Panjang deskripsi maksimal 1000 karakter'],
    },
    price: {
      type: Number,
      required: [true, 'Harga produk harus diisi'],
      min: 1000,
      max: 100000000,
    },
    image_url: {
      type: String,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category'
    },
    tags: {
      type: Schema.Types.ObjectId,
      ref: 'Tag'
    }
  },
  { timestamps: true }
);

module.exports = model('Product', productSchema);
