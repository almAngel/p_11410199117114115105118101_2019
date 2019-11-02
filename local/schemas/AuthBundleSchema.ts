import GenericSchema from "./GenericSchema";
import { Requirements } from "../decorators/Requirements";

export class AuthBundleSchema extends GenericSchema {

    constructor() {
        super();
    }

    @Requirements({ required: true, unique: true, type: String })
    public refToken: string;
    @Requirements({ required: true, unique: true, type: String })
    public uId: string;

    public getSchemaDefinition() {
        return super.getSchemaDefinition(this);
    }    
}