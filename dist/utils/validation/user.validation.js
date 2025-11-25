"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPasswordSchema = exports.forgotPasswordSchema = exports.loginSchema = exports.updateUserSchema = exports.createUserSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.createUserSchema = joi_1.default.object({
    email: joi_1.default.string().email().trim().required(),
    password: joi_1.default.string().min(8).trim().required(),
    role: joi_1.default.string().valid("USER", "ADMIN", "NGO").default("USER")
});
exports.updateUserSchema = joi_1.default.object({
    email: joi_1.default.string().email().trim().optional(),
    password: joi_1.default.string().min(8).trim().optional(),
    role: joi_1.default.string().valid("USER", "ADMIN", "NGO").optional()
});
exports.loginSchema = joi_1.default.object({
    email: joi_1.default.string().email().trim().required(),
    password: joi_1.default.string().required()
});
exports.forgotPasswordSchema = joi_1.default.object({
    email: joi_1.default.string().email().trim().required()
});
exports.resetPasswordSchema = joi_1.default.object({
    email: joi_1.default.string().email().trim().required(),
    otp: joi_1.default.string().required(),
    newPassword: joi_1.default.string().min(8).trim().required()
});
