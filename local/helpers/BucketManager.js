"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const config_json_1 = __importDefault(require("../../config.json"));
class BucketManager {
    constructor() {
        this.instance = new aws_sdk_1.default.S3({});
        this.instance.config.region = "eu-west-3";
        this.instance.config.update({
            accessKeyId: BucketManager.cfg.s3_access,
            secretAccessKey: BucketManager.cfg.s3_secret,
        });
    }
    createFolder({ folderPath, context }) {
        return __awaiter(this, void 0, void 0, function* () {
            let response;
            let finalPath;
            finalPath = folderPath;
            if (context) {
                finalPath += ("/" + context);
            }
            this.instance.config.params = {
                Bucket: BucketManager.cfg.s3_bucket
            };
            this.instance.headBucket((err, data) => {
                if (err)
                    throw err;
            });
            this.instance.putObject({
                Bucket: BucketManager.cfg.s3_bucket,
                Key: finalPath,
                ServerSideEncryption: "AES256"
            }, (err, data) => {
                if (err)
                    throw err;
            });
        });
    }
    uploadFile(folderPath, file, context) {
        let response;
        let reader = new FileReader();
        let fileContent;
        if (file != undefined) {
            reader.readAsArrayBuffer(file);
            fileContent = reader.onload = () => {
                return reader.result;
            };
            this.instance.config.params = {
                Bucket: BucketManager.cfg.s3_bucket
            };
            this.instance.headBucket((err, data) => {
                if (err)
                    throw err;
            });
            this.instance.putObject({
                Bucket: BucketManager.cfg.s3_bucket,
                Key: folderPath + context + "/" + file.name,
                Body: fileContent,
                ServerSideEncryption: "AES256"
            }, (err, data) => {
                if (err)
                    throw err;
            });
        }
    }
}
exports.BucketManager = BucketManager;
BucketManager.cfg = config_json_1.default;
//# sourceMappingURL=BucketManager.js.map