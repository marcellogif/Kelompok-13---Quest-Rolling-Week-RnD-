const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const CustomerSchema = new Schema({
  fullName: {
    type: String,
    required: true,
    //trim: true
  },
  email: {
    type: String,
    required: true,
    // lowercase: true,
    // trim: true
  },
  divi: {
    type: String,
    required: true,
    enum: ['LnT', 'EEO', 'PR', 'HRD', 'RnD']  // sesuai pilihan dropdown
  },
  eventName: {
    type: String,
    required: true,
    // trim: true
  },
  rate: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  comment: {
    type: String,
    required: true,
    // trim: true
  },
  suggestion: {
    type: String,
    required: true,
    // trim: true
  },

  status: {
    type: String,
    enum: ['open', 'in-review', 'resolved'],
    default: 'open'
  },

  createdAt: {
    type: Date,
    default: Date.now()
  },
  updatedAt: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model('CUSTOMER', CustomerSchema);