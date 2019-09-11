const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CurtainsSuplierSchema = new Schema({
  name: {
    type: String,
    required: true
  }
});

module.exports = CurtainsSuplier = mongoose.model('curtainsSuplier', CurtainsSuplierSchema);
