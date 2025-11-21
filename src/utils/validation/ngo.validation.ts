import Joi from "joi";

export const createNgoSchema = Joi.object({
  organizationName: Joi.string().min(2).required(),
  yearEstablished: Joi.number().integer().min(1800).max(new Date().getFullYear()).required(),
  countryOfOperation: Joi.string().required(),
  ngoIdentificationNumber: Joi.string().required(),
  emailAddress: Joi.string().email().trim().required(),
  missionStatement: Joi.string().required(),
  websiteOrSocialLinks: Joi.string().required(),

  // Contact Person
  contactPersonName: Joi.string().optional().allow(null, ""),
  contactPersonPosition: Joi.string().optional().allow(null, ""),
  contactPersonPhoneNumber: Joi.string().optional().allow(null, ""),
  contactPersonResidentialAddress: Joi.string().optional().allow(null, ""),
  contactPersonEmailAddress: Joi.string().email().optional().allow(null, ""),

  // Org Doc fields
  orgCountryOfOperation: Joi.string().optional().allow(null, ""),
  orgEmailAddress: Joi.string().email().optional().allow(null, ""),
  orgDescription: Joi.string().optional().allow(null, ""),
  orgImages: Joi.array().items(Joi.string()).optional(),

  // Wallet & status
  connectedWallet: Joi.string().optional().allow(null, ""),
  statusVerification: Joi.string().valid("PENDING", "APPROVED", "REJECTED").optional(),

  // Relations
  userId: Joi.string().required(),
});

export const updateNgoSchema = Joi.object({
  organizationName: Joi.string().min(2).optional(),
  yearEstablished: Joi.number().integer().min(1800).max(new Date().getFullYear()).optional(),
  countryOfOperation: Joi.string().optional(),
  ngoIdentificationNumber: Joi.string().optional(),
  emailAddress: Joi.string().email().trim().optional(),
  missionStatement: Joi.string().optional(),
  websiteOrSocialLinks: Joi.string().optional(),
  contactPersonName: Joi.string().optional().allow(null, ""),
  contactPersonPosition: Joi.string().optional().allow(null, ""),
  contactPersonPhoneNumber: Joi.string().optional().allow(null, ""),
  contactPersonResidentialAddress: Joi.string().optional().allow(null, ""),
  contactPersonEmailAddress: Joi.string().email().optional().allow(null, ""),
  orgCountryOfOperation: Joi.string().optional().allow(null, ""),
  orgEmailAddress: Joi.string().email().optional().allow(null, ""),
  orgDescription: Joi.string().optional().allow(null, ""),
  orgImages: Joi.array().items(Joi.string()).optional(),
  connectedWallet: Joi.string().optional().allow(null, ""),
  statusVerification: Joi.string().valid("PENDING", "APPROVED", "REJECTED").optional(),
});
