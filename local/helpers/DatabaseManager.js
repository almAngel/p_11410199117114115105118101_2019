"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_json_1 = __importDefault(require("../../config.json"));
const mongoose_1 = __importDefault(require("mongoose"));
class DatabaseManager {
    static connect() {
        this.instance.connect(this.url, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false }, (err) => {
            if (err)
                throw err;
            console.log(`>>> Connection to selected database made at ${this.date.getHours()}:${this.date.getMinutes()}:${this.date.getSeconds()} on ${this.date.getMonth()}/${this.date.getDay()}/${this.date.getFullYear()}`);
        });
    }
    static getInstance() {
        return this.instance;
    }
    static getConfig() {
        return config_json_1.default;
    }
    static getUrl() {
        return this.url;
    }
    static perform(action) {
        this.connect();
        action();
        this.disconnect();
    }
    static disconnect() {
        this.instance.disconnect();
    }
}
exports.DatabaseManager = DatabaseManager;
DatabaseManager.instance = mongoose_1.default;
DatabaseManager.url = config_json_1.default.database_route;
DatabaseManager.date = new Date();
//# sourceMappingURL=DatabaseManager.js.map