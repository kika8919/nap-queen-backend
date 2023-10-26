"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const controller_1 = require("../controller");
const validations_1 = require("../validations");
const validate_1 = require("../middlewares/validate");
const apiKeyValidation_1 = require("../auth/apiKeyValidation");
exports.router = express_1.default.Router();
exports.router.get("/", controller_1.PostsController.getAllPosts);
exports.router.get("/latest", apiKeyValidation_1.validateAPIKey, controller_1.PostsController.getLatestPosts);
exports.router.get("/:id", validate_1.validate(validations_1.PostsValidation.getPostsById), controller_1.PostsController.getPostsById);
exports.router.post("/", validate_1.validate(validations_1.PostsValidation.createPosts), controller_1.PostsController.createPosts);
exports.router.put("/:id", validate_1.validate(validations_1.PostsValidation.updatePosts), controller_1.PostsController.updatePosts);
exports.router.delete("/:id", validate_1.validate(validations_1.PostsValidation.deletePosts), controller_1.PostsController.deletePosts);
//# sourceMappingURL=posts.route.js.map