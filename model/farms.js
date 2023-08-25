const mongoose = require("mongoose");

const farms = new mongoose.Schema(
  {
    farmName: { type: String,required:true},
  },
  {
    collection: "Farms"
  }
);

const model = mongoose.model("Farms", farms);

module.exports = model;
