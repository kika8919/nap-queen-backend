"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Categories = exports.CategorySchema = void 0;
const tslib_1 = require("tslib");
const mongoose_1 = tslib_1.__importDefault(require("mongoose"));
exports.CategorySchema = new mongoose_1.default.Schema({
    category: String,
}, {
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at",
    },
});
exports.Categories = mongoose_1.default.model("Category", exports.CategorySchema);
//# sourceMappingURL=Category.js.map