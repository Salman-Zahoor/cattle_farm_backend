const express = require("express");
const router = express.Router();
const Farm = require("../model/farms");
const FarmRows = require("../model/farmRows");

router.post("/createFarmRow", async (req, res) => {
  const { farmId,rowName } = req.body;
  try {
    const farm=await Farm.findOne({_id:farmId});
    if (farm) {
        const result = await FarmRows.create({
            farmId,
            rowName,
          });
      
          res.status(200).send({
            status: "ok",
            message: "Farm Row Created Successfully",
          });
    }else{
        res.status(400).send({ status: "error", message: "Something went wrong" });
    }
   
  } catch (error) {
    console.log(error, "ERR");
    res.status(400).send({ status: "error", message: "Something went wrong" });
  }
});

router.get("/getAllFarmRowsByFarmId/:id", async (req, res) => {
    const {id}=req.params
  try {
    const farm=await Farm.findOne({_id:id});
    if (farm) {
        const result = await FarmRows.find({farmId:id});
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

router.put("/updateFarmRow/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await FarmRows.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).send({
      status: "ok",
      message: "Farm Row Upated Successfully",
    });
  } catch (error) {
    console.log(error, "ERR");
    res.status(400).send(error);
  }
});

router.delete("/deleteFarm/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await FarmRows.findByIdAndDelete({ _id: id });
    return res.status(200).send({
      data: result,
      status: "ok",
      message: "Farm Row deleted successfully",
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
