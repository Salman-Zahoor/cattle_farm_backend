const mongoose = require("mongoose");

const authUser = new mongoose.Schema(
  {
    name: { type: String},
    email: { type: String, required: true, unique: true },
    role:{type:String,required:true},
    password:{type:String,required:true},
    status:{type:Boolean,default:true},
  },
  {
    collection: "Users",
  }
);

const model = mongoose.model("Users", authUser);

module.exports = model;
