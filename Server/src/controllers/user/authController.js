const userModel = require("../../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function Register(req, res) {
    try {
        const { name, email, password, avatar } = req.body;
        if (!email || !name || !password ) {
            return res.status(400).json({
                success: false,
                message: "All Fields are required",
            });
        }

        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: "Email already in use" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await userModel.create({
            name,
            email,
            password: hashedPassword,
            avatar: avatar || null,
            authProvider: "local",
        });

        const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" });

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        return res.status(201).json({
            message: "Signup successful",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                avatar: user.avatar,
                authProvider: user.authProvider,
                role: user.role,
            },
        });

    } catch (error) {
        console.error("Signup Error:", error);
        return res.status(500).json({ message: "Server error" });
    }
}

async function Login(req, res) {
    try {
        const { email, password } = req.body;

        const user = await userModel.findOne({ email }).select('+password');

        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" });

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        user.password = undefined;

        return res.status(200).json({
            message: "Login successful",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                avatar: user.avatar,
                authProvider: user.authProvider,
                role: user.role,
            },
        });

    } catch (error) {
        console.error("Login Error:", error);
        return res.status(500).json({ message: "Server error" });
    }
}

async function Logout(req, res) {
    try {
        res.cookie("token", "", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            expires: new Date(0), 
        });

       
        return res.status(200).json({
            message: "Logout successful",
        });

    } catch (error) {
        console.error("Logout Error:", error);
        return res.status(500).json({ message: "Server error during logout" });
    }
}


module.exports = {
    Register,
    Login,
    Logout
};