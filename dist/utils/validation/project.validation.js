"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProjectSchema = exports.createProjectSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.createProjectSchema = joi_1.default.object({
    title: joi_1.default.string().min(3).required(),
    description: joi_1.default.string().min(10).required(),
    images: joi_1.default.array().items(joi_1.default.string().uri()).min(1).required(),
    fundingGoal: joi_1.default.number().positive().required(),
    metadataHash: joi_1.default.string().optional().allow(null),
    creatorId: joi_1.default.string().required(), // must match User.id format
    locationId: joi_1.default.string().optional().allow(null),
});
exports.updateProjectSchema = joi_1.default.object({
    title: joi_1.default.string().min(3).optional(),
    description: joi_1.default.string().min(10).optional(),
    images: joi_1.default.array().items(joi_1.default.string().uri()).optional(),
    fundingGoal: joi_1.default.number().positive().optional(),
    raisedAmount: joi_1.default.number().min(0).optional(),
    status: joi_1.default.string().valid("PENDING", "APPROVED", "REJECTED", "COMPLETED").optional(),
    metadataHash: joi_1.default.string().optional().allow(null),
    locationId: joi_1.default.string().optional().allow(null),
});
