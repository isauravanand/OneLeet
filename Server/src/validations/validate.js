const { ZodError } = require("zod");

const validate = (schema) => async (req, res, next) => {
    try {
        req.body = await schema.parseAsync(req.body);
        next();
    } catch (error) {


        if (error instanceof ZodError) {
          
            const rawIssues = error.errors ?? error.issues;

            const errorMessages = Array.isArray(rawIssues) && rawIssues.length > 0
                ? rawIssues.map((issue) => issue?.message || String(issue))
                : [error.message || "Validation error"];

            return res.status(400).json({
                success: false,
                message: "Validation error",
                errors: errorMessages,
            });
        }

        console.error("Unexpected Middleware Error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error during processing.",
        });
    }
};

module.exports = { validate };