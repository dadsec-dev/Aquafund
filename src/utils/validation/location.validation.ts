import Joi from "joi";

export const createLocationSchema = Joi.object({
  address: Joi.string().required(),
  city: Joi.string().required(),
  state: Joi.string().required(),
  country: Joi.string().required(),
  latitude: Joi.number().optional().allow(null),
  longitude: Joi.number().optional().allow(null),
});

export const updateLocationSchema = Joi.object({
  address: Joi.string().optional(),
  city: Joi.string().optional(),
  state: Joi.string().optional(),
  country: Joi.string().optional(),
  latitude: Joi.number().optional().allow(null),
  longitude: Joi.number().optional().allow(null),
});
