"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ServerManager_1 = require("../helpers/ServerManager");
const fs_1 = require("fs");
function Boot() {
    return function (constructor) {
        ServerManager_1.ServerManager.init();
        fs_1.readdir("./local" + ServerManager_1.ServerManager.config().controllers_path, (err, files) => {
            files = files.filter((e) => {
                return e.endsWith(".js");
            });
            files.forEach(e => {
                require("../" + ServerManager_1.ServerManager.config().controllers_path + "/" + e);
            });
        });
    };
}
exports.Boot = Boot;
//# sourceMappingURL=Boot.js.map