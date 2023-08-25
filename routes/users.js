const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const Users = require("../model/users");
const jwt = require("jsonwebtoken");
const JWT_SECRET =
  "sfaosoowennsflaaoosdnqnwieieiwdnsnnsasdasdkasdkqwiebsicxzicbzibaibdd";
const moment = require("moment")

router.post("/registerUser", async (req, res) => {
  const {
    name,
    email,
    role,
    password
  } = req.body;
  console.log(req.body, "BODYYYYYYY=>>>>>");

  let pass = await bcrypt.hash(password, 10);
      try {
        const result = await Users.create({
          name,
          password:pass,
          role,
          email
        });
        res.status(200).json({
          message: "User registered successfully",
          status: "ok",
        });
      } catch (error) {
        if (error.code == 11000) {
          return res.status(400).json({
            status: "error",
            message: "email already in use",
          });
        }
        console.log(error, "ER");
        return res.status(400).json({
          status: "error",
          message: "something went wrong",
        });
      }
});

router.post("/loginUser", async (req, res) => {
  const { email, password } = req.body;
  try {
   const user= await Users.findOne({ email })
      if (!user) {
        return res.status(400).send({
          status: "error",
          message: "email not found",
        });
      }
      if (await bcrypt.compare(password, user.password)) {
        const token = jwt.sign(
          {
            id: user._id,
            email: user.email,
          },
          JWT_SECRET
        );
        let responsesssss = await Users.findOneAndUpdate(
          { _id: user._id },
          { new: true }
        );
        if (user && user.status ==true) {
          user["password"] = null;
          const params = {
            token: token,
            userDetails: user,
          };
          return res.status(200).json({
            status: "ok",
            data: params,
          });
      }else{
      res
        .status(400)
        .send({ status: "error", message: "You'r account is inactive plese contact admin" });
      }
  }else{
    res
      .status(400)
      .send({ status: "error", message: "Invalid email or password" });
    }} catch (error) {
        console.log(error,"error>");
    res.status(400).send({
      status: "error",
      message: "Something went wrong",
    });
  }
});


router.post("/changePasswordUser", async (req, res) => {
    const { email, password, newPassword } = req.body;
    let result = await Users.findOne({ email });
    if (result) {
      if (await bcrypt.compare(password, result.password)) {
        let hashedPassword = await bcrypt.hash(newPassword, 10);
        let updateUser = await Users.updateOne(
          { _id: result._id },
          { $set: { password: hashedPassword } }
        );
        res.status(200).send({ status: "ok", message: "Password updated Successfully" });
      } else {
        res.status(400).send({
          status: "error",
          message: "Current Password is Invalid",
        });
      }
    } else {
      res.status(400).send({
        status: "error",
        message: "something went wrong",
      });
    }
  });

  router.get("/getAllUsers", async (req, res) => {
    try {
     const admin=await Users.findOne({role:"Admin"});
     const token = req.header("Authorization"); 
    //  console.log(token,"token======>");

     if (!token) {
        return res.status(401).send({
          status: "error",
          message: "Authorization token missing",
        });
      }
     const key = jwt.sign(
        {
          id: admin._id,
          email: admin.email,
        },
        JWT_SECRET
      );
      
      const decoded =await jwt.verify(token, JWT_SECRET);
    //   console.log(key,"secret key======>");
    //   console.log(decoded,"decode======>");
      const find = await Users.find({role:"Employee"});
      res.status(200).send({
        data: find,
        status: "ok",
      });
    } catch (error) {
        console.log(error,"error======>");
      res.status(400).send({
        status: "error",
        message: "something went wrong",
      });
    }
});

router.put("/changeUserStatus/:id", async (req, res) => {
    const { id } = req.params;
    const token = req.header("Authorization"); 
    if (!token) {
        return res.status(401).send({
          status: "error",
          message: "Authorization token missing",
        });
      }
    try {
    const decoded=await jwt.verify(token,JWT_SECRET)
      const result = await Users.findByIdAndUpdate(id, {
        status:req.body.status
      }, {
        new: true,
      });
      res.status(200).send({
        data: result,
        status: "ok",
        message: "User status Updated Successfully",
      });
    } catch (error) {
      res.status(400).send({
        status: "error",
        message: "Something went wrong",
      });
    }
  });
module.exports = router;
