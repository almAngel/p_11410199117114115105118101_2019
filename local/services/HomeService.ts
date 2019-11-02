import { UserSchema } from "../schemas/UserSchema";
import { GenericDAO } from "../schemas/dao/GenericDAO";
import { DatabaseManager } from "../helpers/DatabaseManager";
import TokenManager from "../helpers/TokenManager";
import { hash, checkHash } from "../helpers/Tools";
import { AbstractController } from "../controllers/AbstractController";
import { AuthBundleSchema } from "../schemas/AuthBundleSchema";

export default class HomeService {

    private static requestBody: any;
    private static userDAO: GenericDAO<UserSchema>;
    private static authBundleDAO: GenericDAO<AuthBundleSchema>;

    private constructor() { }

    public static async getAccessToken() {
        let response: any;
        let access_token, ref_token: string;
        let matches: boolean;

        //Create DAO
        this.userDAO = new GenericDAO(UserSchema);
        this.authBundleDAO = new GenericDAO(AuthBundleSchema);

        //Sift our request body
        this.requestBody = {
            email: AbstractController.metadata("request").body.email,
            password: AbstractController.metadata("request").body.password
        }

        //Does this User email exist? -> Retrieve user
        response = await this.userDAO.load({
            email: this.requestBody.email
        });

        try {
            matches = checkHash(AbstractController.metadata("request").body.password, response.password);
        } catch (e) {
            response = {
                msg: "Error: Missing required body field",
                status: 422
            }
            return response;
        }

        if (matches) {

            //REF_TOKEN
            ref_token = TokenManager.encode({
                data: {}
            });

            //REF_TOKEN INSIDE TOKEN
            access_token = TokenManager.encode({
                data: { 
                    refToken: ref_token 
                },
                expirationTime: "10min"
            });

            //ASSOCIATE REF_TOKEN AND USER ID
            await this.authBundleDAO.saveOrUpdate(
                {
                    refToken: ref_token,
                    uId: response._id
                }
            );

            response = await this.userDAO.saveOrUpdate(
                {
                    access_token: access_token
                }
                , response._id
            );
        }

        DatabaseManager.disconnect();

        return {
            access_token: access_token
        };
    }
    public static async registerUser() {
        let response: Promise<any>;

        //Create DAO
        this.userDAO = new GenericDAO(UserSchema);

        //Retrieve request body
        this.requestBody = AbstractController.metadata("request").body;

        this.requestBody.password = hash(this.requestBody.password);

        response = await this.userDAO.saveOrUpdate(this.requestBody);

        DatabaseManager.disconnect();

        return response;
    }

}