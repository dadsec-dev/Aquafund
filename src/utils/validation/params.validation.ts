
import Joi from "joi";

export const idParamSchema = Joi.object({
    id: Joi.string()
    .required()
    .regex(/^c\w{24}$/)
    .messages({
        "string.pattern.base": "Invalid id format",
    }),
});

export const walletParamSchema = Joi.object({
    wallet: Joi.string()
    .required()
    .regex(/^0x[a-fA-F0-9]{40}$/)
    .messages({
        "string.empty": "Wallet address is required",
        "string.pattern.base": "Invalid wallet address format",
    }),
});
