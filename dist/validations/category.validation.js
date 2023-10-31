"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategory = exports.updateCategory = exports.createCategory = exports.getCategoryById = void 0;
const tslib_1 = require("tslib");
const joi_1 = tslib_1.__importDefault(require("joi"));
// custom objectId validation for mongodb id
const objectId = (value, helpers) => {
    if (!value.match(/^[0-9a-fA-F]{24}$/)) {
        return helpers.message("{{#label}} must be a valid mongo id");
    }
    return value;
};
exports.getCategoryById = {
    params: joi_1.default.object().keys({
        id: joi_1.default.required().custom(objectId),
    }),
};
exports.createCategory = {
    body: joi_1.default.object().keys({
        category: joi_1.default.string().required(),
    }),
};
exports.updateCategory = {
    params: joi_1.default.object().keys({
        id: joi_1.default.required().custom(objectId),
    }),
    body: joi_1.default.object().keys({
        category: joi_1.default.string().required(),
    }),
};
exports.deleteCategory = {
    params: joi_1.default.object().keys({
        id: joi_1.default.required().custom(objectId),
    }),
};
//# sourceMappingURL=category.validation.js.map