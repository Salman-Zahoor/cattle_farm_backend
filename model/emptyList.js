const mongoose = require("mongoose");

const emptyList = new mongoose.Schema(
  {
    tagNo: { type: String,required: true},
    purhaseFrom: { type: String},
    dateOfPurchasing:{type:String},
    dateOfChecking:{type:String,required:true},
    morningMilk:{type:Number},
    eveningMilk:{type:Number},
    remarks:{type:String},
    checkBy:{type:String},
    shiftDate:{type:String},
    farmId:{type:String,required:true},
    farmRowId:{type:String,required:true},
  },
  {
    collection: "EmptyList",
  }
);

const model = mongoose.model("EmptyList", emptyList);

module.exports = model;
