import { Observable } from "rxjs";
import { GenericDAO } from "../schemas/dao/GenericDAO";
import { AuthBundleSchema } from "../schemas/AuthBundleSchema";
import TokenManager from "./TokenManager";
import { UserSchema } from "../schemas/UserSchema";
import { handledSend } from "./Tools";

export default class AuthBridge extends Observable<any> {

    private genericDAO: GenericDAO<any>;
    public response: any;

    constructor(public_ip: string, access_token: string) {

        super(sub => {
            sub.complete();
        });

        let genericDAO = this.genericDAO;

        this.response = new Promise((resolve, reject) => {
            this.subscribe({
                async complete() {
                    //INNER RESPONSE
                    let response;
                    genericDAO = new GenericDAO(AuthBundleSchema);

                    response = await genericDAO.load({
                        public_ip: public_ip
                    });

                    if (response.status == 404) {
                        response = {
                            msg: "Unauthorized: There doesn't exist a token associated with this IP",
                            status: 403
                        }

                    } else {
                        let tokenContent = Object(TokenManager.decode(access_token));

                        // IF THE USER MAKING THE REQUEST IS THE REAL ONE
                        if (response.ref_token == tokenContent.ref_token) {

                            //MAKE A NEW ACCESS TOKEN
                            let access_token = TokenManager.encode({
                                data: {
                                    ref_token: response.ref_token
                                },
                                expirationTime: '10min'
                            });

                            genericDAO = new GenericDAO(UserSchema);

                            await genericDAO.saveOrUpdate({
                                access_token: access_token
                            }, response.u_id);

                            response = {
                                access_token: access_token
                            }
                        } else {

                        }
                    }
                    resolve(response);
                }

            });
        });

        return this;
    }
}