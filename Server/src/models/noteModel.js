const mongoose = require("mongoose");

const NoteSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Title is required"],
            trim: true,
            maxlength: [120, "Title cannot exceed 120 characters"],
        },
        category: {
            type: String,
            enum: ["pyqs", "important-questions", "notes" ],
            required: [true, "Category is required"],
            index: true
        },
        subject: {
            type: String,
            trim: true,
            maxlength: [50, "Subject name too long"],
        },
        fileUrl: {
            type: String,
            required: [true, "Cloudinary URL is required"],
        },
        publicId: {
            type: String,
            required: [true, "Cloudinary publicId missing"],
            index: true
        },
        fileSize: {
            type: Number,
            required: true,
        },
        mimeType: {
            type: String,
            enum: ["application/pdf"],
            required: true,
        },
        // Using req.user._id from the verifyToken middleware
        uploadedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    { timestamps: true }
);

NoteSchema.index({ category: 1, subject: 1 });
NoteSchema.index({ uploadedBy: 1 });

module.exports = mongoose.model("Note", NoteSchema);