const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");
const { validate } = require("../validations/validate");

const {
    signupValidation,
    loginValidation,
} = require("../validations/user");

// Register
router.post("/register", validate(signupValidation), authController.Register);

// Login
router.post("/login", validate(loginValidation), authController.Login);

//Logout
router.post("/logout",authController.Logout)

module.exports = router;
