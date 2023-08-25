const mongoose = require("mongoose");

const farmsRow = new mongoose.Schema(
  {
    farmId: { type: String,required:true},
    rowName: { type: String,required:true},
  },
  {
    collection: "FarmRows"
  }
);

const model = mongoose.model("FarmRows", farmsRow);

module.exports = model;
