const { z } = require("zod");

const googleAuthValidation = z.object({
    googleId: z
        .string({ required_error: "Google ID is required" })
        .min(10, "Invalid Google ID format"),

    email: z
        .string({ required_error: "Email is required" })
        .trim()
        .toLowerCase()
        .email("Invalid email received from provider"),

    name: z.string().trim().max(50).optional(),
    avatar: z.string().url("Avatar must be a valid URL").optional(),

    authProvider: z.literal("google").default("google"),
});

module.exports = googleAuthValidation;