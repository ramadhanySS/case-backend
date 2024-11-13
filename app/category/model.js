const mongoose = require('mongoose');
const { model, Schema } = mongoose;

let categorySchema = Schema({
  name: {
    type: String,
    required: [true, 'Nama harus ada'],
    minlength: [3, 'Panjang makanan minimal 3 karakter'],
    maxlength: 50,
  },
});

module.exports = model('Category', categorySchema);
