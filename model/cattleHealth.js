const mongoose = require("mongoose");

const cattleHealth = new mongoose.Schema(
  {
    tagNo: { type: String,required: true},
    purhaseFrom: { type: String},
    dateOfPurchasing:{type:String},
    dateOfChecking:{type:String,required:true},
    morningMilk:{type:Number},
    eveningMilk:{type:Number},
    remarks:{type:String},
    medicineRemarks:{type:String},
    shiftDate:{type:String},
    farmId:{type:String,required:true},
    farmRowId:{type:String,required:true},
  },
  {
    collection: "CattleHealth",
  }
);

const model = mongoose.model("CattleHealth", cattleHealth);

module.exports = model;
