import { Request, Response, NextFunction } from "express";
import { Schema } from "joi";

export const validate = (schema: Schema, type: "body" | "params" | "query" = "body") => {
    return (req: Request, res: Response, next: NextFunction) => {
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
