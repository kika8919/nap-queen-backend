"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const allowedOrigins = ["localhost:4200"];
const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.indexOf(origin || "") !== -1 || !origin) {
            callback(null, true);
        }
        else {
            callback(new Error("Not allowed by CORS"), false);
        }
    },
    credentials: true,
    optionsSuccessStatus: 200,
};
exports.default = corsOptions;
//# sourceMappingURL=corsOption.js.map