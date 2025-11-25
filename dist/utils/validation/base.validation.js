"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const validate = (schema, type = "body") => {
    return (req, res, next) => {
        const dataToValidate = req[type];
        const { error } = schema.validate(dataToValidate, { abortEarly: false });
        if (error) {
            return res.status(400).json({
                success: false,
                message: "SyntaxError: Invalid input type",
                errors: error.details.map((d) => d.message),
            });
        }
        next();
    };
};
exports.validate = validate;
