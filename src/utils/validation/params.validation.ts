import Joi from "joi";

export const idParamSchema = Joi.object({
    id: Joi.string().required().regex(/^c\w{24}$/).messages({
        "string.pattern.base": "Invalid id format",
        }),
  });
