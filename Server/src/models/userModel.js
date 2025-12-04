const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please provide your name'],
            trim: true,
            maxlength: [50, 'Name cannot be more than 50 characters'],
        },
        email: {
            type: String,
            required: [true, 'Please provide your email'],
            unique: true,
            lowercase: true,
            trim: true,
            match: [
                /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                'Please provide a valid email address',
            ],
        },
        password: {
            type: String,
            minlength: [6, 'Password must be at least 6 characters'],
            select: false,
        },
        googleId: {
            type: String, 
            unique: true,
            sparse: true, 
        },
        avatar: {
            type: String, 
        },
        authProvider: {
            type: String,
            enum: ['local', 'google'],
            default: 'local'
        }
    },
    { timestamps: true }
);

const User = mongoose.model('User', UserSchema);
module.exports = User;