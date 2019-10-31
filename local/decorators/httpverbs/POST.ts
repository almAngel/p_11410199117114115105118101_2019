import { ContenType } from "../../enum/ContentType";
import { ServerManager } from "../../helpers/ServerManager";
import { AbstractController } from "../../controllers/AbstractController";
import { handledSend } from "../../helpers/Tools";
import TokenManager from "../../helpers/TokenManager";

export function POST({ path, produces = ContenType.TEXT_PLAIN, sealed = false }: { path: string; produces?: ContenType; sealed?: boolean }) {
    //Initialize variables
    let originalMethod: Function;
    let result: any;
    let response: any;

    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor): any {
        originalMethod = descriptor.value;

        descriptor.value = function (...args: any[]) {
            let finalPath = String(args[0] + path).replace("//", "/");

            result = ServerManager.getInstance().post(finalPath, (req: any, res: any, next: any) => {
                //Response reset
                response = "";

                //Set headers
                res.setHeader("Content-type", produces);

                if (sealed) {
                    let token = req.header("px-token");
                    if (token) {
                        try {
                            if (TokenManager.verify(token) != undefined) {
                                AbstractController.setMetadata("px-token", req.header("px-token"));
                            }
                        } catch (e) {
                            response = {
                                msg: "Error: Malformed access token",
                                status: 400
                            }
                        }
                    } else {
                        response = {
                            msg: "Error: Access token required",
                            status: 403
                        }
                    }
                }

                AbstractController.setMetadata("request", req);
                AbstractController.setMetadata("response", res);
                AbstractController.setMetadata("urlParams", req.params);
                AbstractController.setMetadata("status", 200);
                AbstractController.setMetadata("next", next);

                if (response) {
                    handledSend(response);
                }

                originalMethod.apply(this, args);
            });
        }
        return result;
    }

}