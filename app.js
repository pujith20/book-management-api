"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bookRoutes_1 = __importDefault(require("./routes/bookRoutes"));
const logger_1 = require("./middleware/logger");
const errorHandler_1 = require("./middleware/errorHandler");
const environment_1 = require("./config/environment");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(logger_1.logger);
app.use('/api', bookRoutes_1.default);
app.use(errorHandler_1.errorHandler);
app.listen(environment_1.PORT, () => {
    console.log(`Server running on port ${environment_1.PORT}`);
});
