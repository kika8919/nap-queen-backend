"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const router = express_1.default.Router();
const posts_route_1 = require("./posts.route");
const category_route_1 = require("./category.route");
router.use("/posts", posts_route_1.router);
router.use("/category", category_route_1.router);
exports.default = router;
//# sourceMappingURL=index.js.map