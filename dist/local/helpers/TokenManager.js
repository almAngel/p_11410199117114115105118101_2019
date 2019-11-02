"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const fs_1 = __importDefault(require("fs"));
class TokenManager {
    static encode(data) {
        return jsonwebtoken_1.default.sign(data, fs_1.default.readFileSync("./private.key"), { algorithm: 'HS256' });
    }
    static decode(token) {
        return jsonwebtoken_1.default.decode(token, { json: true });
    }
    static verify(token) {
        return jsonwebtoken_1.default.verify(token, fs_1.default.readFileSync("./private.key"), { algorithms: ['HS256'] });
    }
    static checkExpiration(token) {
        let decoded = Object(this.verify(token));
        let expired = false;
        console.log(decoded.expires);
        if (Date.now >= decoded.expires) {
            expired = true;
        }
        return expired;
    }
}
exports.default = TokenManager;
//# sourceMappingURL=TokenManager.js.map