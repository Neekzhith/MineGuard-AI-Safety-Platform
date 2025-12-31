const mongoose = require('mongoose');

// ----------------------------------------------------
// HISTORY SUB-SCHEMA (FOR CHARTS)
// ----------------------------------------------------
const historySchema = new mongoose.Schema({
  time: { type: String },
  battery: { type: Number },
  co: { type: Number },
  ch4: { type: Number },
  temperature: { type: Number },
});

// ----------------------------------------------------
// MAIN DEVICE SCHEMA
// ----------------------------------------------------
const deviceSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    location: {
      type: String,
      trim: true,
    },

    status: {
      type: String,
      enum: ['online', 'offline', 'maintenance', 'alert'],
      default: 'online',
    },

    batteryLevel: {
      type: Number,
      default: 100,
      min: 0,
      max: 100,
    },

    lastActive: {
      type: Date,
      default: Date.now,
    },

    firmwareVersion: {
      type: String,
      default: '1.0.0',
    },

    notes: {
      type: String,
      trim: true,
    },

    tags: [
      {
        type: String,
        trim: true,
      },
    ],

    // ⭐ IMPORTANT — this allows charts to work
    history: {
      type: [historySchema],
      default: [],
    },
  },

  { timestamps: true }
);

module.exports = mongoose.model('Device', deviceSchema);
