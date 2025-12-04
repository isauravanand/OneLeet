const { z } = require("zod");

const signupValidation = z.object({
    name: z
        .string({ required_error: "Name is required" })
        .trim()
        .min(1, "Name cannot be empty")
        .max(50, "Name cannot be more than 50 characters"),

    email: z
        .string({ required_error: "Email is required" })
        .trim()
        .toLowerCase()
        .email("Please provide a valid email address"),

    password: z
        .string({ required_error: "Password is required" })
        .min(6, "Password must be at least 6 characters"),

    avatar: z.string().url("Avatar must be a valid URL").optional(),
    
    authProvider: z.literal("local").default("local").optional(),
});

module.exports = signupValidation;