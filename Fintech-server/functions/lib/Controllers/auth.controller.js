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
exports.SignUpController = exports.LoginController = exports.verifyToken = exports.getUserDetail = void 0;
const jwt = __importStar(require("jsonwebtoken"));
const bcrypt = __importStar(require("bcrypt"));
const message_1 = require("../helpers/message");
const messageTypes_1 = require("../helpers/messageTypes");
// model
const auth_model_1 = require("../Model/auth.model");
const auth_validation_1 = require("../Validation/auth.validation");
const mongoose_1 = __importDefault(require("mongoose"));
async function getUserDetail(req, res) {
    try {
        const id = new mongoose_1.default.Types.ObjectId(req.body.UserId);
        const user = await auth_model_1.UserModel.findById(id).select(["name", "balance"]);
        (0, message_1.messageCustom)(res, messageTypes_1.OK, 'user', user);
    }
    catch (error) {
        (0, message_1.messageError)(res, messageTypes_1.SERVER_ERROR, "server error", error);
    }
}
exports.getUserDetail = getUserDetail;
//validation
async function verifyToken(req, res) {
    try {
        if (req.body.UserId !== undefined) {
            return (0, message_1.messageCustom)(res, messageTypes_1.OK, "verified", { "status": "Authorized" });
        }
    }
    catch (error) {
        return (0, message_1.messageError)(res, messageTypes_1.SERVER_ERROR, "server error", error);
    }
}
exports.verifyToken = verifyToken;
async function LoginController(req, res) {
    const TOKEN_SECRET = "dfasdjrqwu3409234dfadadfowerq3432frwij23490oi";
    try {
        //validation over req.body
        const ValidatedLogin = auth_validation_1.LoginValidation.safeParse(req.body);
        if (!ValidatedLogin.success) {
            (0, message_1.messageError)(res, messageTypes_1.BAD_REQUEST, "Invalid credentials", ValidatedLogin.error);
            return;
        }
        const user = await auth_model_1.UserModel.findOne({ email: ValidatedLogin.data.email });
        if (!user) {
            (0, message_1.messageError)(res, messageTypes_1.BAD_REQUEST, "user doesn't exists", {});
            return;
        }
        //verify password
        const validPass = await bcrypt.compare(req.body.password, user.password);
        if (!validPass) {
            (0, message_1.messageError)(res, messageTypes_1.BAD_REQUEST, "Invalid password", {});
            return;
        }
        const payload = {
            _id: user._id.valueOf()
        };
        const authToken = jwt.sign(payload, TOKEN_SECRET, {
            expiresIn: "1d",
        });
        const refreshToken = jwt.sign(payload, TOKEN_SECRET, {
            expiresIn: "1y",
        });
        (0, message_1.messageCustom)(res, messageTypes_1.OK, "logged in", {
            authToken: authToken,
            refreshToken: refreshToken,
        });
    }
    catch (error) {
        (0, message_1.messageError)(res, messageTypes_1.SERVER_ERROR, "server error", error);
    }
}
exports.LoginController = LoginController;
async function SignUpController(req, res) {
    try {
        const ValidatedSignUP = auth_validation_1.SignUpValidation.safeParse(req.body);
        if (!ValidatedSignUP.success) {
            (0, message_1.messageError)(res, messageTypes_1.BAD_REQUEST, 'invalid input', ValidatedSignUP.error);
            return;
        }
        // hashing password from request
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(ValidatedSignUP.data.password, salt);
        const newValue = Object.assign(Object.assign({}, ValidatedSignUP.data), { password: hashPassword });
        const newUser = await new auth_model_1.UserModel(newValue).save();
        (0, message_1.messageCustom)(res, messageTypes_1.CREATED, "UserModel created", newUser);
    }
    catch (error) {
        return (0, message_1.messageError)(res, messageTypes_1.SERVER_ERROR, "server error", error);
    }
}
exports.SignUpController = SignUpController;
//# sourceMappingURL=auth.controller.js.map