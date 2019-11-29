import { Boot } from "./local/decorators/Boot";
import { ServerManager } from "./local/helpers/ServerManager";
import { DatabaseManager } from "./local/helpers/DatabaseManager";

@Boot()
export class App {

    public serverManager: ServerManager = new ServerManager();

    constructor() {}
}
