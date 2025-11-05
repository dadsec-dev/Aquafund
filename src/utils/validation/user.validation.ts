import Joi from "joi";

export const createUserSchema = Joi.object({
  name: Joi.string().min(2).required(),
  email: Joi.string().email().required(),
  wallet: Joi.string().optional().allow(null),
  companyName: Joi.string().optional().allow(null),
  role: Joi.string().valid("USER", "ADMIN", "NGO").default("USER"),
});

export const updateUserSchema = Joi.object({
  name: Joi.string().min(2).optional(),
  companyName: Joi.string().optional().allow(null),
  wallet: Joi.string().optional().allow(null),
  role: Joi.string().valid("USER", "ADMIN", "NGO").optional(),
});
