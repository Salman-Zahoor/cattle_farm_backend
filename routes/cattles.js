const express = require("express");
const router = express.Router();
const Cattels = require("../model/cattles");

router.post("/addCattlePrchasingRecord", async (req, res) => {
  const { tagNo,purhaseFrom,category,dateOfPurchasing,purchasingCost,farmId } = req.body;
  try {
    const cattels = new Cattels({
        tagNo,purhaseFrom,category,dateOfPurchasing,purchasingCost,farmId
    });
    const result = await cattels.save();
    res.status(200).send({
      data: result,
      status: "ok",
      message: "Cattle record added Successfully",
    });
  } catch (error) {
    console.log(error, "ERR");
    res.status(400).send({ status: "error", message: "Something went wrong" });
  }
});

router.get("/getAllPurchasedCattlesByFarmId/:id", async (req, res) => {
  const {id}=req.params
  try {
    const result = await Cattels.find({farmId:id});
    res.status(200).send({ data: result, status: "ok" });
  } catch (error) {
    res.status(400).send({
      status: "error",
      message: "Something went wrong",
    });
  }
});

router.put("/updateCattleRecord/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Cattels.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).send({
      data: result,
      status: "ok",
      message: "Cattle Record Updated Successfully",
    });
  } catch (error) {
    console.log(error, "ERR");
    res.status(400).send({
      status: "error",
      message: "Something went wrong",
    });
  }
});

router.delete("/deleteCattleRecord/:id", async (req, res) => {
  try {
    const result = Cattels.findByIdAndDelete({ _id: req.params.id }).then((response)=>{
        if (response){
         res.status(200).send({
          data: result,
          status: "ok",
          message: "Cattle Record Deleted Successfully",
        });
    }
      else { res.status(400).send({ status: "error", data: "Data not found" });}
    })
  } catch (error) {
    console.log("errrrrrrrorrrr=>>", error);
  }
});

module.exports = router;
