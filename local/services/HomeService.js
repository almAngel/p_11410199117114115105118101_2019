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
const UserSchema_1 = require("../schemas/UserSchema");
const GenericDAO_1 = require("../schemas/dao/GenericDAO");
const DatabaseManager_1 = require("../helpers/DatabaseManager");
const TokenManager_1 = __importDefault(require("../helpers/TokenManager"));
const Tools_1 = require("../helpers/Tools");
const AbstractController_1 = require("../controllers/AbstractController");
const AuthBundleSchema_1 = require("../schemas/AuthBundleSchema");
const public_ip_1 = require("public-ip");
const BucketManager_1 = require("../helpers/BucketManager");
const config_json_1 = __importDefault(require("../../config.json"));
class HomeService {
    constructor() {
    }
    static getAccessToken() {
        return __awaiter(this, void 0, void 0, function* () {
            let response;
            let access_token, ref_token;
            let matches;
            let databaseManager;
            databaseManager = new DatabaseManager_1.DatabaseManager();
            this.userDAO = new GenericDAO_1.GenericDAO(UserSchema_1.UserSchema);
            this.authBundleDAO = new GenericDAO_1.GenericDAO(AuthBundleSchema_1.AuthBundleSchema);
            this.requestBody = {
                email: AbstractController_1.AbstractController.metadata("request").body.email,
                password: AbstractController_1.AbstractController.metadata("request").body.password
            };
            response = yield this.userDAO.load({
                email: this.requestBody.email
            });
            try {
                matches = Tools_1.checkHash(AbstractController_1.AbstractController.metadata("request").body.password, response.password);
            }
            catch (e) {
                if (this.requestBody.password == undefined) {
                    response = {
                        msg: "Error: Password required",
                        status: 422
                    };
                }
                else {
                    return response;
                }
                return response;
            }
            if (matches) {
                ref_token = TokenManager_1.default.encode({
                    data: {}
                });
                access_token = TokenManager_1.default.encode({
                    data: {
                        ref_token: ref_token
                    },
                    expirationTime: "10min"
                });
                let aux = yield this.authBundleDAO.load({
                    u_id: response.id
                });
                if (aux.status != 404) {
                    yield this.authBundleDAO.saveOrUpdate({
                        body: {
                            ref_token: ref_token,
                            public_ip: yield public_ip_1.v4()
                        },
                        id: aux._id
                    });
                }
                else {
                    yield this.authBundleDAO.saveOrUpdate({
                        body: {
                            ref_token: ref_token,
                            u_id: response._id,
                            public_ip: yield public_ip_1.v4()
                        }
                    });
                }
                yield this.userDAO.saveOrUpdate({
                    body: {
                        access_token: access_token
                    },
                    id: response._id
                });
                response = {
                    access_token: access_token,
                    status: 200
                };
            }
            else {
                response = {
                    msg: "Unauthorized: Password doesn't match",
                    status: 401
                };
            }
            databaseManager.disconnect();
            return response;
        });
    }
    static registerUser() {
        return __awaiter(this, void 0, void 0, function* () {
            let response;
            let databaseManager;
            let bucketManager;
            databaseManager = new DatabaseManager_1.DatabaseManager();
            bucketManager = new BucketManager_1.BucketManager();
            this.userDAO = new GenericDAO_1.GenericDAO(UserSchema_1.UserSchema);
            this.requestBody = {
                email: AbstractController_1.AbstractController.metadata("request").body.email,
                username: AbstractController_1.AbstractController.metadata("request").body.username,
                password: AbstractController_1.AbstractController.metadata("request").body.password
            };
            try {
                this.requestBody.password = Tools_1.hash(this.requestBody.password);
            }
            catch (e) {
                if (this.requestBody.password == undefined) {
                    response = {
                        msg: "Error: Password required",
                        status: 422
                    };
                }
                else {
                    return response;
                }
                return response;
            }
            response = yield this.userDAO.saveOrUpdate({
                body: this.requestBody
            });
            if (response.status != 409) {
                let responseAux = yield this.userDAO.load({
                    body: this.requestBody
                });
                bucketManager.createFolder({ folderPath: responseAux._id + "/" + HomeService.cfg.app + "/" + "public/" });
                bucketManager.createFolder({ folderPath: responseAux._id + "/" + HomeService.cfg.app + "/" + "private/" });
            }
            databaseManager.disconnect();
            return response;
        });
    }
}
exports.default = HomeService;
HomeService.cfg = config_json_1.default;
//# sourceMappingURL=HomeService.js.map