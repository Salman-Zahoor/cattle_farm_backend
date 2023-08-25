const express = require("express");
const router = express.Router();
const Farm = require("../model/farms");
const FarmRows = require("../model/farmRows");
const PregnantList=require("../model/pregnantList");
const Cattels=require("../model/cattles");

router.post("/addPregnantCattle", async (req, res) => {
  const { farmId,farmRowId,tagNo,purhaseFrom,dateOfPurchasing,dateOfChecking,remarks,checkBy } = req.body;
  try {
    const farm=await Farm.findOne({_id:farmId});
    const farmRow=await FarmRows.findOne({_id:farmRowId})
    const cattle=await Cattels.findOne({tagNo:tagNo})
    if (farm && farmRow && cattle) {
        const result = await PregnantList.create({
            farmId,farmRowId,tagNo,purhaseFrom,dateOfPurchasing,dateOfChecking,remarks,checkBy
          });
      
          res.status(200).send({
            status: "ok",
            message: "Cattle added in Pregnant List Successfully",
          });
    }else{
        res.status(400).send({ status: "error", message: "Something went wrong" });
    }
   
  } catch (error) {
    console.log(error, "ERR");
    res.status(400).send({ status: "error", message: "Something went wrong" });
  }
});


router.get("/getAllPragnentListByFarmId/:id", async (req, res) => {
    const {id}=req.params
  try {
    const farm=await Farm.findOne({_id:id});
    if (farm) {
        const result = await PregnantList.find({farmId:id});
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
 
router.get("/getAllPragnentListByRowId/:id", async (req, res) => {
    const {id}=req.params
  try {
    const farmRow=await FarmRows.findOne({_id:id});
    const farm=await Farm.findOne({_id:farmRow.id});
    if (farm && farmRow) {
        const result = await PregnantList.find({farmRowId:id});
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

router.put("/updatePregnantList/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await PregnantList.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).send({
      status: "ok",
      message: "Pregnant Cattle Record Upated Successfully",
    });
  } catch (error) {
    console.log(error, "ERR");
    res.status(400).send(error);
  }
});

router.delete("/deletePregnantCattle/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await PregnantList.findByIdAndDelete({ _id: id });
    return res.status(200).send({
      data: result,
      status: "ok",
      message: "Pregnant Cattle Record deleted successfully",
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
