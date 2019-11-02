"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractController_1 = require("../../controllers/AbstractController");
const ServerManager_1 = require("../../helpers/ServerManager");
const ContentType_1 = require("../../enum/ContentType");
const Tools_1 = require("../../helpers/Tools");
const TokenManager_1 = __importDefault(require("../../helpers/TokenManager"));
function GET({ path, produces = ContentType_1.ContenType.TEXT_PLAIN, sealed = false }) {
    let originalMethod;
    let result;
    let response;
    return function (target, propertyKey, descriptor) {
        originalMethod = descriptor.value;
        descriptor.value = function (...args) {
            let finalPath = String(args[0] + path).replace("//", "/");
            result = ServerManager_1.ServerManager.getInstance().get(finalPath, (req, res, next) => {
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
                            response = {
                                msg: "Error: Malformed or expired access token",
                                status: 403
                            };
                        }
                    }
                    else {
                        response = {
                            msg: "Error: Access token required",
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
            });
            return result;
        };
    };
}
exports.GET = GET;
//# sourceMappingURL=GET.js.map