import Joi from "joi";

export const clientFilterSchema = Joi.object({
  orderBy: Joi.array().items(Joi.string().valid("name", "age", "clientType")),
  min: Joi.number().integer().min(0),
  max: Joi.number().integer().min(0),
});
