const express = require("express");
const router = express.Router();
const Farm = require("../model/farms");
const FarmRows = require("../model/farmRows");
const EmptyList=require("../model/emptyList");
const Cattels=require("../model/cattles");

router.post("/addEmptyCattle", async (req, res) => {
  const { farmId,farmRowId,tagNo,purhaseFrom,dateOfPurchasing,dateOfChecking,remarks,checkBy,morningMilk,eveningMilk,shiftDate } = req.body;
  try {
    const farm=await Farm.findOne({_id:farmId});
    const farmRow=await FarmRows.findOne({_id:farmRowId})
    const cattle=await Cattels.findOne({tagNo:tagNo})
    if (farm && farmRow && cattle) {
        const result = await EmptyList.create({
            farmId,farmRowId,tagNo,purhaseFrom,dateOfPurchasing,dateOfChecking,remarks,checkBy,morningMilk,eveningMilk,shiftDate
          });
      
          res.status(200).send({
            status: "ok",
            message: "Cattle added in Empty List Successfully",
          });
    }else{
        res.status(400).send({ status: "error", message: "Something went wrong" });
    }
   
  } catch (error) {
    console.log(error, "ERR");
    res.status(400).send({ status: "error", message: "Something went wrong" });
  }
});

router.get("/getAllEmptyListByFarmId/:id", async (req, res) => {
    const {id}=req.params
  try {
    const farm=await Farm.findOne({_id:id});
    if (farm) {
        const result = await EmptyList.find({farmId:id});
        console.log("RESULTTT", result);
        res.status(200).send({ data: result, status: "ok" });
    }else{
        res.status(400).send({ status: "error", message: "Something went wrong" });
    }
  
  } catch (error) {
    res.status(400).send({
      status: "error",
      message: "Something went wrong",
    });
  }
});


router.get("/getAllEmptyListByRowId/:id", async (req, res) => {
    const {id}=req.params
  try {
    const farmRow=await FarmRows.findOne({_id:id});
    const farm=await Farm.findOne({_id:farmRow.id});
    if (farm && farmRow) {
        const result = await EmptyList.find({farmRowId:id});
        console.log("RESULTTT", result);
        res.status(200).send({ data: result, status: "ok" });
    }else{
        res.status(400).send({ status: "error", message: "Something went wrong" });
    }
  
  } catch (error) {
    res.status(400).send({
      status: "error",
      message: "Something went wrong",
    });
  }
});

router.put("/updateEmptyList/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await EmptyList.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).send({
      status: "ok",
      message: "Empty Cattle Record Upated Successfully",
    });
  } catch (error) {
    console.log(error, "ERR");
    res.status(400).send(error);
  }
});

router.delete("/deleteEmptyCattle/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await EmptyList.findByIdAndDelete({ _id: id });
    return res.status(200).send({
      data: result,
      status: "ok",
      message: "Empty Cattle Record deleted successfully",
    });
  } catch (error) {
    console.log("errrrrrrrorrrr=>>", error);
    res.status(400).send({
      status: "error",
      message: "Something went wrong",
    });
  }
});



module.exports = router;
