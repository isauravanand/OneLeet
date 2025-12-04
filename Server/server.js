require('dotenv').config()
const express = require("express");
const connectDB = require('./src/config/db');
const userRoutes = require("./src/routes/user/userRoutes")
const googleAuth = require("./src/routes/user/googleAuth")
const pdfRoutes = require("./src/routes/content/noteRoutes");
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");

connectDB();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());
app.use(cookieParser());

//Apis
app.use("/api/auth",userRoutes);
app.use("/api/auth", googleAuth);
app.use("/api/pdf",pdfRoutes);



app.listen(3000,()=>{
    console.log(`App is running on the Port 3000`);});