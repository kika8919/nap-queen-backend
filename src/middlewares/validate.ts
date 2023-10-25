import express from "express";
import Joi from "joi";

const pick = (object: object | Joi.SchemaLikeWithoutArray, keys: string[]) => {
  return keys.reduce((obj, key) => {
    if (object && Object.prototype.hasOwnProperty.call(object, key)) {
      // eslint-disable-next-line no-param-reassign
      obj[key] = object[key];
    }
    return obj;
  }, {});
};

export const validate =
  (schema: Joi.SchemaLike) =>
  (
    req: express.Request,
    _res: express.Response,
    next: express.NextFunction
  ) => {
    const validSchema = pick(schema, ["params", "query", "body"]);
    const object = pick(req, Object.keys(validSchema));
    const { value, error } = Joi.compile(validSchema)
      .prefs({ errors: { label: "key" }, abortEarly: false })
      .validate(object);

    if (error) {
      const errorMessage = error.details
        .map((details) => details.message)
        .join(", ");
      let err = new Error(errorMessage);
      err.stack = "";
      return next(err);
    }
    Object.assign(req, value);
    return next();
  };
