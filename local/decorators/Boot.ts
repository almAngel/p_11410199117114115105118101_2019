import { ServerManager } from "../helpers/ServerManager";
import { readdirSync, readdir } from "fs";
import path from "path";


export function Boot() {
    return function (constructor: Function) {
        
        ServerManager.init();

        readdir("./local" + ServerManager.config().controllers_path, (err, files) => {
            files = files.filter((e) => {
                return e.endsWith(".js");
            });
            files.forEach(e => {
                require("../" + ServerManager.config().controllers_path + "/" + e);
            });
        });
        
        
    }
}