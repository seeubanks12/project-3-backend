const { Schema, model } = require("mongoose");

const pinSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      min: 3,
      max: 60,
    },
    description: {
      type: String,
      required: true,
      min: 3,
    },
    rating: {
      type: Number,
      required: true,
      min: 0,
      max: 5,
    },
    lng: {
      type: Number,
      requierd: true,
    },
    lat: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Pin = model("Pin", pinSchema);

module.exports = Pin;
