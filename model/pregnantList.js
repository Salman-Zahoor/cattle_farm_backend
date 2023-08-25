const mongoose = require("mongoose");

const pregnantCattles = new mongoose.Schema(
  {
    tagNo: { type: String,required: true},
    purhaseFrom: { type: String},
    dateOfPurchasing:{type:String},
    dateOfChecking:{type:String,required:true},
    remarks:{type:String},
    checkBy:{type:String},
    farmId:{type:String,required:true},
    farmRowId:{type:String,required:true},
  },
  {
    collection: "PregnantCattles",
  }
);

const model = mongoose.model("pregnantCattles", pregnantCattles);

module.exports = model;
