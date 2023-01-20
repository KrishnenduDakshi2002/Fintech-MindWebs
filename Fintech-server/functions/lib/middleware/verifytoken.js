"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = __importStar(require("jsonwebtoken"));
// importing model
const auth_model_1 = require("../Model/auth.model");
const mongoose_1 = __importDefault(require("mongoose"));
const message_1 = require("../helpers/message");
const messageTypes_1 = require("../helpers/messageTypes");
async function UserAuthentication(req, res, next) {
    var _a;
    const TOKEN_SECRET = "dfasdjrqwu3409234dfadadfowerq3432frwij23490oi";
    try {
        const JWToken = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
        if (typeof JWToken == "undefined") {
            return (0, message_1.messageCustom)(res, messageTypes_1.BAD_REQUEST, "token not present", {});
        }
        else {
            // token is not found
            if (!JWToken)
                return (0, message_1.messageCustom)(res, messageTypes_1.BAD_REQUEST, "Token is not found", {});
            // this will throw error if token is expired
            // Decoding the jwt
            /*
              if jwt is expired then it will through error
              so catch will be executed;
      
              if valid then we wil get _id back
            */
            const DecodedToken = jwt.verify(JWToken, TOKEN_SECRET);
            // finding user by id
            const user = await auth_model_1.UserModel.findById(new mongoose_1.default.Types.ObjectId(DecodedToken._id));
            if (!user)
                return (0, message_1.messageCustom)(res, messageTypes_1.BAD_REQUEST, "user doesn't exists", {});
            // Adding verified to req.body
            req.body.UserId = user._id;
            // calling next function
            next();
        }
    }
    catch (error) {
        return (0, message_1.messageError)(res, messageTypes_1.UNAUTHORIZED, 'expired or invalid token', error);
    }
}
exports.default = UserAuthentication;
//# sourceMappingURL=verifytoken.js.map