const express = require("express");
const router = express.Router();
const Farm = require("../model/farms");

router.post("/createFarm", async (req, res) => {
  const { farmName } = req.body;
  try {
    const result = await Farm.create({
      farmName,
    });

    res.status(200).send({
      status: "ok",
      message: "Farm Created Successfully",
    });
  } catch (error) {
    console.log(error, "ERR");
    res.status(400).send({ status: "error", message: "Something went wrong" });
  }
});

router.get("/getAllFarms", async (req, res) => {
  try {
    const result = await Farm.find();
    console.log("RESULTTT", result);
    res.status(200).send({ data: result, status: "ok" });
  } catch (error) {
    res.status(400).send({
      status: "error",
      message: "Something went wrong",
    });
  }
});

router.put("/updateFarm/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Farm.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).send({
      status: "ok",
      message: "Farm Upated Successfully",
    });
  } catch (error) {
    console.log(error, "ERR");
    res.status(400).send(error);
  }
});

router.delete("/deleteFarm/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Farm.findByIdAndDelete({ _id: id });
    return res.status(200).send({
      data: result,
      status: "ok",
      message: "Farm deleted successfully",
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
