import config from "../../config.json";
import mongoose from "mongoose";

export class DatabaseManager {
    private static readonly instance = mongoose;
    private static readonly url: string = config.database_route + ":" + config.database_port + "/" + config.database_name;
    private static readonly date: Date = new Date();

    public static connect() {
        
        this.instance.connect(this.url, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false }, (err) => {
            if (err) throw err;
            console.log(
                `>>> Connection to selected database made at ${this.date.getHours()}:${this.date.getMinutes()}:${this.date.getSeconds()} on ${this.date.getMonth()}/${this.date.getDay()}/${this.date.getFullYear()}`);
        });
    }

    public static getInstance() {
        return this.instance;
    }

    public static getConfig() {
        return config;
    }

    public static getUrl() {
        return this.url;
    }

    public static perform(action: Function) {
        this.connect();
        action();
        this.disconnect();
    }

    public static disconnect() {
        this.instance.disconnect();
    }

} 