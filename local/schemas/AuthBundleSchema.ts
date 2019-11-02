import GenericSchema from "./GenericSchema";
import { Requirements } from "../decorators/Requirements";

export class AuthBundleSchema extends GenericSchema {

    constructor() {
        super();
    }

    @Requirements({ required: true, unique: true, type: String })
    public ref_token: string;
    @Requirements({ required: true, unique: true, type: String })
    public u_id: string;

    public getSchemaDefinition() {
        return super.getSchemaDefinition(this);
    }    
}