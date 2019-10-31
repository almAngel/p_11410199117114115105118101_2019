"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractController_1 = require("../controllers/AbstractController");
const UserSchema_1 = require("../schemas/UserSchema");
const GenericDAO_1 = require("../schemas/dao/GenericDAO");
const DatabaseManager_1 = require("../helpers/DatabaseManager");
const TokenManager_1 = __importDefault(require("../helpers/TokenManager"));
class HomeService {
    constructor() { }
    static getAccessToken() {
        return __awaiter(this, void 0, void 0, function* () {
            let response;
            let token;
            this.userDAO = new GenericDAO_1.GenericDAO(UserSchema_1.UserSchema);
            this.requestBody = {
                email: AbstractController_1.AbstractController.metadata("request").body.email,
                password: AbstractController_1.AbstractController.metadata("request").body.password
            };
            response = yield this.userDAO.load({
                email: this.requestBody.email
            });
            let matches = UserSchema_1.UserSchema.checkHash(AbstractController_1.AbstractController.metadata("request").body.password, response.password);
            if (matches) {
                token = TokenManager_1.default.encode({
                    id: response._id,
                    email: AbstractController_1.AbstractController.metadata("request").body.email,
                    username: response.username,
                });
                response = yield this.userDAO.saveOrUpdate({
                    accessToken: token
                }, response._id);
            }
            DatabaseManager_1.DatabaseManager.disconnect();
            return {
                accessToken: token
            };
        });
    }
    static registerUser() {
        return __awaiter(this, void 0, void 0, function* () {
            let response;
            this.userDAO = new GenericDAO_1.GenericDAO(UserSchema_1.UserSchema);
            this.requestBody = AbstractController_1.AbstractController.metadata("request").body;
            this.requestBody.password = UserSchema_1.UserSchema.hashPassword(this.requestBody.password);
            response = yield this.userDAO.saveOrUpdate(this.requestBody);
            DatabaseManager_1.DatabaseManager.disconnect();
            return response;
        });
    }
}
exports.default = HomeService;
//# sourceMappingURL=HomeService.js.map