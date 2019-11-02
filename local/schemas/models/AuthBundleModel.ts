import { DatabaseManager } from "../../helpers/DatabaseManager";
import { AuthBundleSchema } from "../AuthBundleSchema";


export const Model = DatabaseManager.getInstance().model(AuthBundleSchema.name.toLowerCase().replace("schema", ""), new AuthBundleSchema().getSchemaDefinition());