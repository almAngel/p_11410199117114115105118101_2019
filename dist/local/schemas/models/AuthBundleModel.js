"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DatabaseManager_1 = require("../../helpers/DatabaseManager");
const AuthBundleSchema_1 = require("../AuthBundleSchema");
exports.Model = DatabaseManager_1.DatabaseManager.getInstance().model(AuthBundleSchema_1.AuthBundleSchema.name.toLowerCase().replace("schema", ""), new AuthBundleSchema_1.AuthBundleSchema().getSchemaDefinition());
//# sourceMappingURL=AuthBundleModel.js.map