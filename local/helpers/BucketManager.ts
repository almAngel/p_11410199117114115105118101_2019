import aws from "aws-sdk";
import config from "../../config.json";
import { read } from "fs";

export class BucketManager {
    private instance: aws.S3;
    private static readonly cfg = config;

    constructor() {
        this.instance = new aws.S3({});

        this.instance.config.region = "eu-west-3";

        this.instance.config.update({
            accessKeyId: BucketManager.cfg.s3_access,
            secretAccessKey: BucketManager.cfg.s3_secret,
        });
        
    }

    public async createFolder({folderPath, context}: { folderPath: string; context?: string}) {
        let response: any;
        let finalPath: string;

        finalPath = folderPath;

        if(context) {
            finalPath += ("/" + context) 
        }

        this.instance.config.params = {
            Bucket: BucketManager.cfg.s3_bucket
        }

        this.instance.headBucket(
            (err, data) => {
                if (err) throw err;
            }
        );
        
        this.instance.putObject({
            Bucket: BucketManager.cfg.s3_bucket,
            Key: finalPath,
            ServerSideEncryption: "AES256"
        }, 
        (err, data) => {
            if(err) throw err;
        });
    }

    //PENDIENTE DE CONFIRMACION
    public uploadFile(folderPath: string, file: File, context: string) {
        let response: any;
        let reader = new FileReader();
        let fileContent;

        if(file != undefined) {
            reader.readAsArrayBuffer(file);
            fileContent = reader.onload = () => {
                return reader.result;
            }

            this.instance.config.params = {
                Bucket: BucketManager.cfg.s3_bucket
            }

            this.instance.headBucket(
                (err, data) => {
                    if (err) throw err;
                }
            );

            this.instance.putObject({
                Bucket: BucketManager.cfg.s3_bucket,
                Key: folderPath + context + "/" + file.name,
                Body: fileContent,
                ServerSideEncryption: "AES256"
            }, 
            (err, data) => {
                if(err) throw err;
            });
        }
        
    }
}