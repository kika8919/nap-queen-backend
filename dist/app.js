"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const http_1 = tslib_1.__importDefault(require("http"));
const express_1 = require("./config/express");
const startServer = () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const app = express_1.createServer();
    const server = http_1.default
        .createServer(app)
        .listen({ host: express_1.HOST, port: express_1.PORT }, () => {
        const addressInfo = server.address();
        console.log(`Server running on port http://${addressInfo.address}:${addressInfo.port}`);
    });
    // Handle SIGINT signal for graceful server shutdown
    process.once("SIGINT", () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        if (server) {
            server.close(() => {
                console.log("Server has been stopped.");
                process.exit(0);
            });
        }
        else {
            process.exit(0);
        }
    }));
});
startServer();
//# sourceMappingURL=app.js.map