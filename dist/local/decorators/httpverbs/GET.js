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
const AbstractController_1 = require("../../controllers/AbstractController");
const ServerManager_1 = require("../../helpers/ServerManager");
const ContentType_1 = require("../../enum/ContentType");
const Tools_1 = require("../../helpers/Tools");
const TokenManager_1 = __importDefault(require("../../helpers/TokenManager"));
const AuthBridge_1 = __importDefault(require("../../helpers/AuthBridge"));
const public_ip_1 = require("public-ip");
function GET({ path, produces = ContentType_1.ContenType.TEXT_PLAIN, sealed = false }) {
    let originalMethod;
    let result;
    let response;
    let bridge;
    let genericDAO;
    return function (target, propertyKey, descriptor) {
        originalMethod = descriptor.value;
        descriptor.value = function (...args) {
            let finalPath = String(args[0] + path).replace("//", "/");
            result = ServerManager_1.ServerManager.getInstance().get(finalPath, (req, res, next) => __awaiter(this, void 0, void 0, function* () {
                response = "";
                res.setHeader("Content-type", produces);
                if (sealed) {
                    let token = req.header("px-token");
                    if (token) {
                        try {
                            if (!TokenManager_1.default.expired(token)) {
                                AbstractController_1.AbstractController.setMetadata("px-token", req.header("px-token"));
                            }
                        }
                        catch (e) {
                            if (e.message == "invalid signature") {
                                response = {
                                    msg: "Error: Malformed access token",
                                    status: 400
                                };
                            }
                            else {
                                bridge = new AuthBridge_1.default(yield public_ip_1.v4(), token);
                                response = yield bridge.response;
                            }
                        }
                    }
                    else {
                        response = {
                            msg: "Unauthorized: Access token required",
                            status: 403
                        };
                    }
                }
                AbstractController_1.AbstractController.setMetadata("request", req);
                AbstractController_1.AbstractController.setMetadata("response", res);
                AbstractController_1.AbstractController.setMetadata("urlParams", req.params);
                AbstractController_1.AbstractController.setMetadata("status", 200);
                AbstractController_1.AbstractController.setMetadata("next", next);
                if (response) {
                    Tools_1.handledSend(response);
                }
                originalMethod.apply(this, args);
            }));
            return result;
        };
    };
}
exports.GET = GET;
//# sourceMappingURL=GET.js.map