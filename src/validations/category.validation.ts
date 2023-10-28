import Joi from "joi";

// custom objectId validation for mongodb id
const objectId = (value, helpers) => {
  if (!value.match(/^[0-9a-fA-F]{24}$/)) {
    return helpers.message("{{#label}} must be a valid mongo id");
  }
  return value;
};

export const createCategory = {
  body: Joi.object().keys({
    category: Joi.string().required(),
  }),
};

export const updateCategory = {
  params: Joi.object().keys({
    id: Joi.required().custom(objectId),
  }),
  body: Joi.object().keys({
    category: Joi.string().required(),
  }),
};

export const deleteCategory = {
  params: Joi.object().keys({
    id: Joi.required().custom(objectId),
  }),
};
