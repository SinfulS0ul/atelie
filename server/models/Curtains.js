const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CurtainsSchema = new Schema({
  suplier: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  number: {
    type: Number,
    required: false
  },
  length: {
    type: Number,
    required: false
  },
  high: {
    type: Number,
    required: false
  },
  inputPrice: {
    type: Number,
    required: false
  },
  outputPrice: {
    type: Number,
    required: false
  },
  inputSummary: {
    type: Number,
    required: false
  },
  outputSummary: {
    type: Number,
    required: false
  },
  type: {
    type: String,
    required: true
  }
});

module.exports = Curtains = mongoose.model('curtains', CurtainsSchema);
