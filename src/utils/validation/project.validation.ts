import Joi from "joi";

export const createProjectSchema = Joi.object({
  title: Joi.string().min(3).required(),
  description: Joi.string().min(10).required(),
  images: Joi.array().items(Joi.string().uri()).min(1).required(),
  fundingGoal: Joi.number().positive().required(),
  metadataHash: Joi.string().optional().allow(null),
  creatorId: Joi.string().required(), // must match User.id format
  locationId: Joi.string().optional().allow(null),
});

export const updateProjectSchema = Joi.object({
  title: Joi.string().min(3).optional(),
  description: Joi.string().min(10).optional(),
  images: Joi.array().items(Joi.string().uri()).optional(),
  fundingGoal: Joi.number().positive().optional(),
  raisedAmount: Joi.number().min(0).optional(),
  status: Joi.string().valid("PENDING", "APPROVED", "REJECTED", "COMPLETED").optional(),
  metadataHash: Joi.string().optional().allow(null),
  locationId: Joi.string().optional().allow(null),
});
