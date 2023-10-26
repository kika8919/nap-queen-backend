"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const tslib_1 = require("tslib");
const joi_1 = tslib_1.__importDefault(require("joi"));
const pick = (object, keys) => {
    return keys.reduce((obj, key) => {
        if (object && Object.prototype.hasOwnProperty.call(object, key)) {
            // eslint-disable-next-line no-param-reassign
            obj[key] = object[key];
        }
        return obj;
    }, {});
};
const validate = (schema) => (req, _res, next) => {
    const validSchema = pick(schema, ["params", "query", "body"]);
    const object = pick(req, Object.keys(validSchema));
    const { value, error } = joi_1.default.compile(validSchema)
        .prefs({ errors: { label: "key" }, abortEarly: false })
        .validate(object);
    if (error) {
        const errorMessage = error.details
            .map((details) => details.message)
            .join(", ");
        class BadRequestError extends Error {
            constructor(message) {
                super(message);
                this.name = "Bad Request";
                this.status = 400;
            }
        }
        let err = new BadRequestError(errorMessage);
        err.stack = "";
        return next(err);
    }
    Object.assign(req, value);
    return next();
};
exports.validate = validate;
//# sourceMappingURL=validate.js.map