import { Document, Model, Error } from "mongoose";
import GenericSchema from "../GenericSchema";
import { DatabaseManager } from "../../helpers/DatabaseManager";
import { MongoError, ObjectId } from "mongodb";
import IGenericDAO from "./IGenericDAO";

export class GenericDAO<T extends GenericSchema> implements IGenericDAO {

    private type: new () => T;
    private static model: Model<Document>;

    constructor(type: new () => T) {
        this.type = type;
    }

    public async load(body: Object): Promise<any> {
        let finalResponse: any;
        let databaseResponse: any;

        GenericDAO.model = require("../models/" + this.type.name.replace("Schema", "Model")).Model;

        DatabaseManager.connect();
        databaseResponse = await GenericDAO.model.findOne(body).exec();

        if (databaseResponse != null) {
            finalResponse = databaseResponse;
        } else {
            finalResponse = {
                msg: `Error: Document of type ${this.type.name.replace("Schema", "")} not found`,
                status: 404
            }
        }

        return finalResponse;
    }
    public async loadById(id: string): Promise<any> {
        let finalResponse: any;
        let databaseResponse: any;

        GenericDAO.model = require("../models/" + this.type.name.replace("Schema", "Model")).Model;

        DatabaseManager.connect();
        databaseResponse = await GenericDAO.model.findById(new ObjectId(id)).exec();

        if (databaseResponse != null) {
            finalResponse = databaseResponse;
        } else {
            finalResponse = {
                msg: `Error: Document of type ${this.type.name.replace("Schema", "")} not found`,
                status: 404
            }
        }

        return finalResponse;
    }
    public async loadGroup(body: Object): Promise<any> {
        let finalResponse: any;
        let databaseResponse: any;

        //require(xxxxModel).Model
        GenericDAO.model = require("../models/" + this.type.name.replace("Schema", "Model")).Model;

        DatabaseManager.connect();

        databaseResponse = await GenericDAO.model.find(body).exec();

        if (databaseResponse != null) {
            finalResponse = databaseResponse;
        } else {
            finalResponse = {
                msg: `Error: Documents of type ${this.type.name.replace("Schema", "")} not found`,
                status: 404
            }
        }

        return finalResponse;
    }
    public async saveOrUpdate(body: Object, id?: string): Promise<any> {
        let finalResponse: any;
        let databaseResponse: any;

        //require(xxxxModel).Model
        GenericDAO.model = require("../models/" + this.type.name.replace("Schema", "Model")).Model;

        DatabaseManager.connect();

        //If id is defined -> Update
        if (id != undefined) {
            databaseResponse = await GenericDAO.model.findByIdAndUpdate(id, body).exec();

            if(databaseResponse) {
                finalResponse = {
                    msg: `Document of type ${this.type.name.replace("Schema", "")} successfully updated`,
                    status: 200
                }
            } else {
                finalResponse = {
                    msg: `Error: Document of type ${this.type.name.replace("Schema", "")} couldn't be updated`,
                    status: 404
                }
            }
        }
        //Directly create a new document (no id)
        else {
            try {
                databaseResponse = await GenericDAO.model.create(body);
                finalResponse = {
                    msg: `Document of type ${this.type.name.replace("Schema", "")} successfully inserted`,
                    status: 201
                }
            } catch (e) {
                if (e.code == 11000) {
                    finalResponse = {
                        msg: `Error: Documents of type ${this.type.name.replace("Schema", "")} couldn't be inserted`,
                        cause: "Data from one or more fields marked as unique collided with request body",
                        causeCode: e.code,
                        status: 409
                    }
                }
                else {
                    finalResponse = {
                        msg: `Error: Documents of type ${this.type.name.replace("Schema", "")} couldn't be inserted`,
                        cause: "Missing required data",
                        causeCode: 12000,
                        status: 422
                    }
                }
            }
        }

        return finalResponse;
    }
    public async delete(id: string): Promise<any> {
        let finalResponse: any;
        let databaseResponse: any;

        //require(xxxxModel).Model
        GenericDAO.model = require("../models/" + this.type.name.replace("Schema", "Model")).Model;

        DatabaseManager.connect();

        databaseResponse = await GenericDAO.model.findByIdAndDelete(id).exec();

        if(databaseResponse) {
            finalResponse = {
                msg: `Documents of type ${this.type.name.replace("Schema", "")} has been successfully deleted`,
                status: 200
            }
        } 
        else {
            finalResponse = {
                msg: `Error: Documents of type ${this.type.name.replace("Schema", "")} couldn't be deleted`,
                status: 404
            }
        }

        return finalResponse;
    }
    public async count(body: Object): Promise<any> {
        let finalResponse: any;
        let databaseResponse: any;

        GenericDAO.model = require("../models/" + this.type.name.replace("Schema", "Model")).Model;

        DatabaseManager.connect();
        databaseResponse = await GenericDAO.model.countDocuments(body).exec();

        if (databaseResponse != null) {
            finalResponse = databaseResponse;
        } else {
            finalResponse = {
                msg: `Error: Document of type ${this.type.name.replace("Schema", "")} not found`,
                status: 404
            }
        }

        return finalResponse;
    }
}