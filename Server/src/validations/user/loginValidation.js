const { z } = require("zod");

const loginValidation = z.object({
    email: z
        .string({ required_error: "Email is required" })
        .trim()
        .toLowerCase()
        .email("Invalid email format"),

    password: z
        .string({ required_error: "Password is required" })
        .min(6, "Password must be at least 6 characters"),
});

module.exports = loginValidation;