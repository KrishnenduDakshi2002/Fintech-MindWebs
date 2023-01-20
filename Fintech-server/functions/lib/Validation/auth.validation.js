"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignUpValidation = exports.LoginValidation = void 0;
const zod_1 = require("zod");
exports.LoginValidation = zod_1.z.object({
    email: zod_1.z.string().email({ message: 'Invalid email address' }),
    password: zod_1.z.string()
});
exports.SignUpValidation = zod_1.z.object({
    balance: zod_1.z.string(),
    name: zod_1.z.string(),
    email: zod_1.z.string().email({ message: 'Invalid email address' }),
    password: zod_1.z.string()
});
//# sourceMappingURL=auth.validation.js.map