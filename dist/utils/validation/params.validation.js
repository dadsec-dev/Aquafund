"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.walletParamSchema = exports.idParamSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.idParamSchema = joi_1.default.object({
    id: joi_1.default.string()
        .required()
        .regex(/^c\w{24}$/)
        .messages({
        "string.pattern.base": "Invalid id format",
    }),
});
exports.walletParamSchema = joi_1.default.object({
    wallet: joi_1.default.string()
        .required()
        .regex(/^0x[a-fA-F0-9]{40}$/)
        .messages({
        "string.empty": "Wallet address is required",
        "string.pattern.base": "Invalid wallet address format",
    }),
});
