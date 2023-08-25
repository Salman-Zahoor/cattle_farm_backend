const mongoose = require("mongoose");

const cattles = new mongoose.Schema(
  {
    tagNo: { type: String,required: true,unique:true},
    purhaseFrom: { type: String, required: true},
    category:{type:String,required:true},
    dateOfPurchasing:{type:String,required:true},
    purchasingCost:{type:Number,required:true},
    farmId:{type:String,required:true}
  },
  {
    collection: "Cattels",
  }
);

const model = mongoose.model("Cattels", cattles);

module.exports = model;
