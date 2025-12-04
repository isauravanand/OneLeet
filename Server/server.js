require('dotenv').config()
const express = require("express");
const connectDB = require('./src/config/db');
const userRoutes = require("./src/routes/userRoutes")
const googleAuth = require("./src/routes/googleAuth")
const cors = require("cors");
const app = express();

connectDB();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());

app.post("/test", (req, res) => {
    console.log("REQ BODY:", req.body);
    res.json({ received: req.body });
});


//Apis
app.use("/api/auth",userRoutes);
app.use("/api/auth", googleAuth);



app.listen(3000,()=>{
    console.log(`App is running on the Port 3000`);});