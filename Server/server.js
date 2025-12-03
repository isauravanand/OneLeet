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
app.use(cors({
    origin: "http://localhost:5173", 
    credentials: true
}));


//Apis
app.use("/api/auth",userRoutes);
app.use("/api/auth", googleAuth);



app.listen(3000,()=>{
    console.log(`App is running on the Port 3000`);
});