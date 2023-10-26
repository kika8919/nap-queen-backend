"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createServer = exports.PORT = exports.HOST = void 0;
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const dotenv = tslib_1.__importStar(require("dotenv"));
const body_parser_1 = tslib_1.__importDefault(require("body-parser"));
const cors_1 = tslib_1.__importDefault(require("cors"));
const corsOption_1 = tslib_1.__importDefault(require("./corsOption"));
const mongoose_1 = tslib_1.__importDefault(require("mongoose"));
const db_connect_1 = tslib_1.__importDefault(require("./db.connect"));
const routes_1 = tslib_1.__importDefault(require("../routes"));
dotenv.config();
exports.HOST = process.env.HOST || "localhost";
/* istanbul ignore next */
exports.PORT = (process.env.PORT || 3000);
const createServer = () => {
    const app = express_1.default();
    db_connect_1.default();
    app.use(cors_1.default(corsOption_1.default));
    app.use(body_parser_1.default.urlencoded({ extended: false }));
    app.use(body_parser_1.default.json());
    app.use("/api", routes_1.default);
    app.get("/health", (_req, res) => {
        res.json({
            uptime: process.uptime(),
            status: "UP",
            timestamp: new Date(),
        });
    });
    // Not found error handler
    app.use((_req, _res, next) => {
        const error = new Error("not found");
        error.status = 404;
        next(error);
    });
    app.use((err, _req, res, _next) => {
        res.status(err.status || 500);
        res.json({ errors: { message: err.message, err } });
    });
    mongoose_1.default.connection.once("open", () => {
        console.log("Connected to MongoDB");
    });
    return app;
};
exports.createServer = createServer;
//# sourceMappingURL=express.js.map