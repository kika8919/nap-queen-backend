"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPostByCategory = exports.deletePosts = exports.updatePosts = exports.createPosts = exports.getPostsById = void 0;
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
        category_id: joi_1.default.string().required().custom(objectId),
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
exports.getPostByCategory = {
    params: joi_1.default.object().keys({
        name: joi_1.default.string().required(),
    }),
    query: joi_1.default.object().keys({
        count: joi_1.default.number().default(10).min(1),
    }),
};
//# sourceMappingURL=posts.validation.js.map