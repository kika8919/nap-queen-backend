"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const controller_1 = require("../controller");
const validate_1 = require("../middlewares/validate");
const validations_1 = require("../validations");
exports.router = express_1.default.Router();
exports.router.get("/", controller_1.CategoryController.getAllCategories);
exports.router.get("/:id", validate_1.validate(validations_1.CategoryValidation.getCategoryById), controller_1.CategoryController.getCategoryById);
exports.router.post("/", validate_1.validate(validations_1.CategoryValidation.createCategory), controller_1.CategoryController.createCategory);
exports.router.put("/:id", validate_1.validate(validations_1.CategoryValidation.updateCategory), controller_1.CategoryController.updateCategory);
exports.router.delete("/:id", validate_1.validate(validations_1.CategoryValidation.deleteCategory), controller_1.CategoryController.deleteCategory);
//# sourceMappingURL=category.route.js.map