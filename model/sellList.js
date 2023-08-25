const mongoose = require("mongoose");

const sellList = new mongoose.Schema(
  {
    tagNo: { type: String,required: true},
    descrption:{type:String},
    date:{type:String},
    purhaseFrom: { type: String},
    remarks:{type:String},
    costOfSelling:{type:Number},
    receivedAmount:{type:Number},
    balance:{type:Number},
    farmId:{type:String,required:true},
    farmRowId:{type:String,required:true},
  },
  {
    collection: "SellList",
  }
);

const model = mongoose.model("SellList", sellList);

module.exports = model;
