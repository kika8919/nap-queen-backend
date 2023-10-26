"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateAPIKey = void 0;
const validateAPIKey = (req, res, next) => {
    const apiKey = req.headers["x-api-key"];
    if (!apiKey || apiKey !== process.env.API_KEY) {
        return res.status(403).json({ error: "Invalid API key" });
    }
    next();
};
exports.validateAPIKey = validateAPIKey;
//# sourceMappingURL=apiKeyValidation.js.map