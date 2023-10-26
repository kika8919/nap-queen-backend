"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const mongoose_1 = tslib_1.__importDefault(require("mongoose"));
require("../models");
const connectDB = () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(process.env.DATABASE_URI); // Make sure DATABASE_URI is defined in your environment variables and has the correct type (string).
    }
    catch (err) {
        /* istanbul ignore next */
        console.error(err);
    }
});
exports.default = connectDB;
//# sourceMappingURL=db.connect.js.map