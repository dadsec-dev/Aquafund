"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateLocationSchema = exports.createLocationSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.createLocationSchema = joi_1.default.object({
    address: joi_1.default.string().required(),
    city: joi_1.default.string().required(),
    state: joi_1.default.string().required(),
    country: joi_1.default.string().required(),
    latitude: joi_1.default.number().optional().allow(null),
    longitude: joi_1.default.number().optional().allow(null),
});
exports.updateLocationSchema = joi_1.default.object({
    address: joi_1.default.string().optional(),
    city: joi_1.default.string().optional(),
    state: joi_1.default.string().optional(),
    country: joi_1.default.string().optional(),
    latitude: joi_1.default.number().optional().allow(null),
    longitude: joi_1.default.number().optional().allow(null),
});
