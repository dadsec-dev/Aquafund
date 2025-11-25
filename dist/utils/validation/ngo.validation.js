"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateNgoSchema = exports.createNgoSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.createNgoSchema = joi_1.default.object({
    organizationName: joi_1.default.string().min(2).required(),
    yearEstablished: joi_1.default.number().integer().min(1800).max(new Date().getFullYear()).required(),
    countryOfOperation: joi_1.default.string().required(),
    ngoIdentificationNumber: joi_1.default.string().required(),
    emailAddress: joi_1.default.string().email().trim().required(),
    missionStatement: joi_1.default.string().required(),
    websiteOrSocialLinks: joi_1.default.string().required(),
    // Contact Person
    contactPersonName: joi_1.default.string().optional().allow(null, ""),
    contactPersonPosition: joi_1.default.string().optional().allow(null, ""),
    contactPersonPhoneNumber: joi_1.default.string().optional().allow(null, ""),
    contactPersonResidentialAddress: joi_1.default.string().optional().allow(null, ""),
    contactPersonEmailAddress: joi_1.default.string().email().optional().allow(null, ""),
    // Org Doc fields
    orgCountryOfOperation: joi_1.default.string().optional().allow(null, ""),
    orgEmailAddress: joi_1.default.string().email().optional().allow(null, ""),
    orgDescription: joi_1.default.string().optional().allow(null, ""),
    orgImages: joi_1.default.array().items(joi_1.default.string()).optional(),
    // Wallet & status
    connectedWallet: joi_1.default.string().optional().allow(null, ""),
    statusVerification: joi_1.default.string().valid("PENDING", "APPROVED", "REJECTED").optional(),
});
exports.updateNgoSchema = joi_1.default.object({
    organizationName: joi_1.default.string().min(2).optional(),
    yearEstablished: joi_1.default.number().integer().min(1800).max(new Date().getFullYear()).optional(),
    countryOfOperation: joi_1.default.string().optional(),
    ngoIdentificationNumber: joi_1.default.string().optional(),
    emailAddress: joi_1.default.string().email().trim().optional(),
    missionStatement: joi_1.default.string().optional(),
    websiteOrSocialLinks: joi_1.default.string().optional(),
    contactPersonName: joi_1.default.string().optional().allow(null, ""),
    contactPersonPosition: joi_1.default.string().optional().allow(null, ""),
    contactPersonPhoneNumber: joi_1.default.string().optional().allow(null, ""),
    contactPersonResidentialAddress: joi_1.default.string().optional().allow(null, ""),
    contactPersonEmailAddress: joi_1.default.string().email().optional().allow(null, ""),
    orgCountryOfOperation: joi_1.default.string().optional().allow(null, ""),
    orgEmailAddress: joi_1.default.string().email().optional().allow(null, ""),
    orgDescription: joi_1.default.string().optional().allow(null, ""),
    orgImages: joi_1.default.array().items(joi_1.default.string()).optional(),
    connectedWallet: joi_1.default.string().optional().allow(null, ""),
    statusVerification: joi_1.default.string().valid("PENDING", "APPROVED", "REJECTED").optional(),
});
