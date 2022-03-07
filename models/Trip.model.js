const { Schema, model } = require("mongoose");

const tripSchema = new Schema(
  {
    title: {
      type: String,
      trim: true,
      require: true,
    },
    location: {
      type: String,
      trim: true,
    },
    start: Date,
    end: Date,
    description: String,
    // created: {
    //   type: Date,
    //   default: Date.now,
    // },
    // lastUpdate: Date,
    // user: {
    //   type: Schema.Types.ObjectId,
    //   ref: "User",
    // },
    // guests: [
    //   {
    //     type: Schema.Types.ObjectId,
    //     ref: "User",
    //   },
  },
  {
    timestamps: true,
  }
);

tripSchema.methods.lastUpDatedDate = function () {
  this.lastUpdated = Date.now();
  return this.lastUpdated;
};

const Trip = model("Trip", tripSchema);

module.exports = Trip;
