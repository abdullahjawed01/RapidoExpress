import express from "express"
import dotenv from "dotenv"

dotenv.config()
const PORT = process.env.PORT
const app = express()
app.use(express.json())


import "./utils/dbConnect.js"

// imports public
import userPublic from "./controllers/public/User.js"
import riderPublic from "./controllers/public/Rider.js"

// auth
import middleware from "./auth/auth.js"

// impports Private
import userPrivate from "./controllers/private/User/user.js"
import riderPrivate from "./controllers/private/Rider/rider.js"




// apis
app.get("/",(req,res)=>{
    try {
        res.status(200).json({msg:"This is my test api"})
    } catch (error) {
        console.log(error);
    res.status(500).json({msg:error})
    }
})



// routes
app.use("/users", userPublic)
app.use("/riders", riderPublic)
app.use(middleware)
app.use("/private/user",userPrivate)
app.use("/private/rider",riderPrivate)


// listen and running
app.listen(PORT,()=>{
    console.log(`The server is up and running on http://localhost:${PORT}`);
})