"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_json_1 = __importDefault(require("../../config.json"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
class ServerManager {
    static init() {
        console.log(process.env);
        this.instance.use(body_parser_1.default.json());
        this.instance.use(body_parser_1.default.urlencoded({ extended: true }));
        this.instance.use(cors_1.default());
        this.instance.listen(process.env.PORT || this.cfg.default_port, () => {
            console.log("Server initialized at port " + this.cfg.server_route + ":" + this.cfg.default_port);
        })
            .on("error", () => {
            console.log("Error: Couldn't start a new server");
        });
    }
    static getInstance() {
        return this.instance;
    }
    ;
    static getPort() {
        return this.cfg.default_port;
    }
    static config() {
        return this.cfg;
    }
}
exports.ServerManager = ServerManager;
ServerManager.instance = express_1.default();
ServerManager.cfg = config_json_1.default;
//# sourceMappingURL=ServerManager.js.map