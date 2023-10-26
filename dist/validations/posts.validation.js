"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePosts = exports.updatePosts = exports.createPosts = exports.getPostsById = void 0;
const tslib_1 = require("tslib");
const joi_1 = tslib_1.__importDefault(require("joi"));
// custom objectId validation for mongodb id
const objectId = (value, helpers) => {
    if (!value.match(/^[0-9a-fA-F]{24}$/)) {
        return helpers.message("{{#label}} must be a valid mongo id");
    }
    return value;
};
exports.getPostsById = {
    params: joi_1.default.object().keys({
        id: joi_1.default.required().custom(objectId),
    }),
};
exports.createPosts = {
    body: joi_1.default.object().keys({
        title: joi_1.default.string().required(),
        content: joi_1.default.string().required(),
        category_id: joi_1.default.string().required(),
    }),
};
exports.updatePosts = {
    params: joi_1.default.object().keys({
        id: joi_1.default.required().custom(objectId),
    }),
    body: joi_1.default.object().keys({
        title: joi_1.default.string().required(),
        content: joi_1.default.string().required(),
    }),
};
exports.deletePosts = {
    params: joi_1.default.object().keys({
        id: joi_1.default.required().custom(objectId),
    }),
};
//# sourceMappingURL=posts.validation.js.map