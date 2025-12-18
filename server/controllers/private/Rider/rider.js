import express from 'express'
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import userModel from "../../../models/User/user.js"
import riderModel from "../../../models/Rider/Rider.js"
import ridesModel from '../../../models/Rides/Rides.js';

let router = express.Router();


// apis

router.get("/getrider/:_id", async (req, res) => {
  try {
    let check = req.params._id;
    let final = await riderModel.findOne({ _id: check });
    res.status(200).json(final);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
});

router.put("/updaterider/:_id", async (req, res) => {
  try {
    let check = req.params._id;
    let update = req.body;

    let final = await riderModel.updateOne(
      { _id: check },
      { $set: update },
      { new: true }
    );
    let user = await riderModel.findOne({ _id: check });
    if (update.password) {
      let hashpass = await bcrypt.hash(update.password, 10);
      user.password = hashpass;
      await user.save();
      res.status(200).json("user updated");
    }
    res.status(200).json(final);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
});

router.put("/deleterider/:_id", async (req, res) => {
  try {
    let check = req.params._id;
    let final = await riderModel.deleteOne({ _id: check });
    res.status(200).json(final);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
});


router.get("/ride-history",async(req,res)=>{
  try {
    let rides = await ridesModel.findOne({rider_id:"69440cb680c8f02c873452b5"})
    res.status(200).json(rides)
  } catch (error) {
    console.log(error);
    res.status(500).json(error)
  }
})









export default router