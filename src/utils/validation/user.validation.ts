import Joi from "joi";

export const createUserSchema = Joi.object({
  email: Joi.string().email().trim().required(),
  password: Joi.string().min(8).trim().required(),
  role: Joi.string().valid("USER", "ADMIN", "NGO").default("USER")
});

export const updateUserSchema = Joi.object({
  email: Joi.string().email().trim().optional(),
  password: Joi.string().min(8).trim().optional(),
  role: Joi.string().valid("USER", "ADMIN", "NGO").optional()
});
