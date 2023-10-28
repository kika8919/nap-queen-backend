"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategory = exports.updateCategory = exports.createCategory = exports.getAllCategories = void 0;
const tslib_1 = require("tslib");
const models_1 = require("../models");
const getAllCategories = (_req, res, next) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const allCategories = yield models_1.Categories.find();
        res.json(allCategories.map((category) => category.toJson()));
    }
    catch (err) {
        next(err);
    }
});
exports.getAllCategories = getAllCategories;
const createCategory = (req, res, next) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const { category } = req.body;
        const newCategory = new models_1.Categories({ category });
        const result = yield models_1.Categories.create(newCategory);
        res.json(result.toJson());
    }
    catch (err) {
        next(err);
    }
});
exports.createCategory = createCategory;
const updateCategory = (req, res, next) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { category } = req.body;
        const updatedCategory = yield models_1.Categories.findByIdAndUpdate(id, {
            $set: { category },
        }, { new: true });
        if (!exports.updateCategory) {
            res.json({ message: "invalid categoryId" });
        }
        else {
            res.json(updatedCategory.toJson());
        }
    }
    catch (err) {
        next(err);
    }
});
exports.updateCategory = updateCategory;
const deleteCategory = (req, res, next) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deletedCategory = yield models_1.Categories.findByIdAndDelete(id);
        if (!deletedCategory) {
            res.json({ message: "invalid categoryId" });
        }
        else {
            res.json({ message: "success" });
        }
    }
    catch (err) {
        next(err);
    }
});
exports.deleteCategory = deleteCategory;
//# sourceMappingURL=category.controller.js.map