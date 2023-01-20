"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import config from 'config';
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const helmet_1 = __importDefault(require("helmet"));
const db_1 = __importDefault(require("./DB/db"));
const router_1 = require("./router");
const app = (0, express_1.default)();
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cookie_parser_1.default)());
app.use((0, helmet_1.default)());
app.use('/api', router_1.router);
app.listen(3000, () => {
    console.log(`server running at http://localhost:${3000}`);
    (0, db_1.default)();
});
exports.default = app;
//# sourceMappingURL=app.js.map