import express from 'express'
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import userModel from "../../../models/User/user.js"
import riderModel from "../../../models/Rider/Rider.js"
import ridesModel from '../../../models/Rides/Rides.js';

let router = express.Router();

// apis
router.get("/getuser/:_id", async (req, res) => {
  try {
    let check = req.params._id;
    let final = await userModel.findOne({ _id: check });
    res.status(200).json({msg:final});
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
});

router.put("/updatecuser/:_id", async (req, res) => {
  try {
    let check = req.params._id;
    let update = req.body;

    let final = await userModel.updateOne(
      { _id: check },
      { $set: update },
      { new: true }
    );
    let user = await userModel.findOne({ _id: check });
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

router.put("/deleteuser/:_id", async (req, res) => {
  try {
    let check = req.params._id;
    let final = await userModel.deleteOne({ _id: check });
    res.status(200).json(final);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
});



router.post("/book-ride",async(req,res)=>{
  try {
    let user = await userModel.findOne({_id:req.user.id})
    let rider = await riderModel.findOne({email:"rider.mike@example.com"}) 
    let {Destination,Pickup,fare} = req.body
    // Destination //Pickup
    let createrides = {
      Destination,
      Pickup,
      fare,
      user_id:user._id,
      rider_id:rider._id
    }
    let final = await ridesModel.create(createrides)
    res.status(200).json(final)


  } catch (error) {
    console.log(error);
    res.status(500).json(error)
  }
})


// router.put("/ride-started",async(req,res)=>{
//   try {
//     let user = await userModel.findOne({_id:"69440ca780c8f02c873452b2"})
//     let userRides = await ridesModel.findOne({user_id:user._id})
//     console.log(userRides._id);
//     let final = await userModel.updateOne({_id:req.user.id},{
//       $set:{currentride:userRides._id}
//     })

//     let Rider = await riderModel.findOne({_id:"69440cb680c8f02c873452b5"})

//     let riderRides = await ridesModel.findOne({rider_id:Rider._id})
//     console.log(riderRides._id);
//     let final2 = await riderModel.updateOne({_id:req.user.id},{
//       $set:{currentRide:riderRides._id}
//     })




//     res.status(200).json({msg:final,msg:final2,user:"Your ride has been started"})
//   } catch (error) {
//     console.log(error);
//     res.status(500).json(error)
//   }
// })


router.get("/ride-started", async (req, res) => {
  try {
   
    const user = await userModel.findById({_id:"69440ca780c8f02c873452b2"});
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

   
    const userRide = await ridesModel.findOne({ user_id: user._id });
    if (!userRide) {
      return res.status(404).json({ msg: "No ride found for user" });
    }

 
    await userModel.updateOne(
      { _id: user._id },
      { $set: { currentride: userRide._id } }
    );


    const rider = await riderModel.findById(userRide.rider_id);
    if (!rider) {
      return res.status(404).json({ msg: "Rider not found" });
    }

 
    await riderModel.updateOne(
      { _id: rider._id },
      { $set: { currentRide: userRide._id } }
    );

    res.status(200).json({
      success: true,
      message: "Ride started successfully",
      rideId: userRide._id
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/ride-ended",async(req,res)=>{
  try {
    let user = await userModel.updateOne({_id:"69440ca780c8f02c873452b2"},{
    $set:{currentride:null}
    })
    let rider = await riderModel.updateOne({_id:"69440cb680c8f02c873452b5"},{
    $set:{currentRide:null}
    })
    res.status(200).json(user,rider)
  } catch (error) {
    console.log(error);
    res.status(500).json(error)
  }
})

router.get("/ride-history",async(req,res)=>{
  try {
    let rides = await ridesModel.findOne({user_id:"69440ca780c8f02c873452b2"})
    res.status(200).json(rides)
  } catch (error) {
    console.log(error);
    res.status(500).json(error)
  }
})








export default router