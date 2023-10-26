"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const controller_1 = require("../controller");
exports.router = express_1.default.Router();
exports.router.get("/", controller_1.CategoryController.getAllCategories);
exports.router.post("/", controller_1.CategoryController.createCategory);
exports.router.put("/:id", controller_1.CategoryController.updateCategory);
exports.router.delete("/:id", controller_1.CategoryController.deleteCategory);
//# sourceMappingURL=category.route.js.map