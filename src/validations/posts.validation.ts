import Joi from "joi";

// custom objectId validation for mongodb id
const objectId = (value, helpers) => {
  if (!value.match(/^[0-9a-fA-F]{24}$/)) {
    return helpers.message("{{#label}} must be a valid mongo id");
  }
  return value;
};

export const getPostsById = {
  params: Joi.object().keys({
    id: Joi.required().custom(objectId),
  }),
};

export const createPosts = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    content: Joi.string().required(),
    category_id: Joi.string().required().custom(objectId),
  }),
};

export const updatePosts = {
  params: Joi.object().keys({
    id: Joi.required().custom(objectId),
  }),
  body: Joi.object().keys({
    title: Joi.string().required(),
    content: Joi.string().required(),
  }),
};

export const deletePosts = {
  params: Joi.object().keys({
    id: Joi.required().custom(objectId),
  }),
};

export const getPostByCategory = {
  params: Joi.object().keys({
    name: Joi.string().required(),
  }),
  query: Joi.object().keys({
    count: Joi.number().default(10).min(1),
  }),
};
