import express from "express";
import config from "../../config.json";
import bodyParser from "body-parser";
import cors from "cors";

export class ServerManager {
    private static readonly instance = express();
    private static readonly cfg = config;

    public static init() {

        this.instance.use(bodyParser.json());
        this.instance.use(bodyParser.urlencoded({ extended: true }));
        this.instance.use(cors());

        this.instance.listen(this.cfg.default_port || 3000, () => {
            console.log("Server initialized at port " + this.cfg.server_route + ":" + this.cfg.default_port);
        })
        .on("error", () => {
            console.log("Error: Couldn't start a new server");
        });

    }

    public static getInstance() {
        return this.instance;
    };

    public static getPort() {
        return this.cfg.default_port;
    }

    public static config() {
        return this.cfg;
    }
}

/*
function errorHandler(err: any, req: any, res: any, next: any) {
    if (res.headersSent) {
        return next(err);
    }
    res.status(500);
    res.render('error', { error: err });
}
*/