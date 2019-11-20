"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractController_1 = require("../controllers/AbstractController");
const bcrypt_1 = __importDefault(require("bcrypt"));
function handledSend(arg) {
    try {
        if (!AbstractController_1.AbstractController.metadata("response").headersSent) {
            AbstractController_1.AbstractController.metadata("response").send(arg);
            AbstractController_1.AbstractController.metadata("response").end();
        }
        else {
            AbstractController_1.AbstractController.metadata("next")();
        }
    }
    catch (e) {
        Error.captureStackTrace(e, handledSend);
        throw e;
    }
}
exports.handledSend = handledSend;
function hash(pass) {
    return bcrypt_1.default.hashSync(pass, bcrypt_1.default.genSaltSync());
}
exports.hash = hash;
function checkHash(decrypted, encrypted) {
    return bcrypt_1.default.compareSync(decrypted, encrypted);
}
exports.checkHash = checkHash;
//# sourceMappingURL=Tools.js.map