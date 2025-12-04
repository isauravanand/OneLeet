const express = require("express");
const googleAuthController = require("../controllers/googleAuthController");
const router = express.Router();


const { validate } = require("../validations/validate");
const googleAuthValidation = require("../validations/user/googleAuthValidation");

//Google-Register/Login
router.post("/google-login",validate(googleAuthValidation), googleAuthController);

module.exports=router;