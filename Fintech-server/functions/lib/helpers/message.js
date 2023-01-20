"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageCustom = exports.messageError = exports.message = void 0;
const message = function (res, messageType, message) {
    let return_object = {
        message: message,
    };
    return_object = Object.assign(return_object, messageType);
    res.status(messageType.statusCode).json(return_object);
};
exports.message = message;
const messageError = function (res, messageType, message, err) {
    let return_object = {
        message: message,
        error: err,
    };
    return_object = Object.assign(return_object, messageType);
    res.status(messageType.statusCode).json(return_object);
};
exports.messageError = messageError;
const messageCustom = function (res, messageType, message, return_object) {
    return_object.message = message;
    return_object = Object.assign(return_object, messageType);
    res.status(messageType.statusCode).json(return_object);
};
exports.messageCustom = messageCustom;
//# sourceMappingURL=message.js.map