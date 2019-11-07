import { AbstractController } from "../../controllers/AbstractController";
import { ServerManager } from "../../helpers/ServerManager";
import { ContenType } from "../../enum/ContentType";
import { handledSend } from "../../helpers/Tools";
import TokenManager from "../../helpers/TokenManager";
import AuthBridge from "../../helpers/AuthBridge";
import { v4 as pipRetrieverV4 } from "public-ip";
import { GenericDAO } from "../../schemas/dao/GenericDAO";
import { UserSchema } from "../../schemas/UserSchema";

export function GET({ path, produces = ContenType.TEXT_PLAIN, sealed = false }: { path: string; produces?: ContenType; sealed?: boolean; }) {
    //Initialize variables
    let originalMethod: Function;
    let result: any;
    let response: any;
    let bridge: AuthBridge;
    let genericDAO: GenericDAO<UserSchema>;

    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor): any {
        originalMethod = descriptor.value;

        descriptor.value = function (...args: any[]) {
            let finalPath = String(args[0] + path).replace("//", "/");

            result = ServerManager.getInstance().get(finalPath, async (req: any, res: any, next: any) => {
                //Response reset
                response = "";

                //Set headers
                res.setHeader("Content-type", produces);

                if (sealed) {
                    let token = req.header("px-token");
                    if (token) {
                        try {
                            if (!TokenManager.expired(token)) {
                                genericDAO = new GenericDAO(UserSchema);

                                let n = await genericDAO.count({
                                    ref_token: token
                                });
                                AbstractController.setMetadata("px-token", req.header("px-token"));
                                
                                if(n == 1) {
                                    AbstractController.setMetadata("px-token", req.header("px-token"));
                                } else {
                                    response = {
                                        msg: "Unauthorized: User not found",
                                        status: 403
                                    }
                                }
                                
                            }
                        } catch (e) {
                            if(e.message == "invalid signature") {
                                response = {
                                    msg: "Error: Malformed access token",
                                    status: 400
                                }
                            } else {
                                bridge = new AuthBridge(await pipRetrieverV4(), token);
                                response = await bridge.response;
                            }
                        }
                    } else {
                        response = {
                            msg: "Unauthorized: Access token required",
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
            return result;
        }
    }
}