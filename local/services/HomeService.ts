import { AbstractController } from "../controllers/AbstractController";
import { UserSchema } from "../schemas/UserSchema";
import { GenericDAO } from "../schemas/dao/GenericDAO";
import { DatabaseManager } from "../helpers/DatabaseManager";
import TokenManager from "../helpers/TokenManager";
import { hash, checkHash } from "../helpers/Tools";

export default class HomeService {

    private static requestBody: any;
    private static userDAO: GenericDAO<UserSchema>;

    private constructor() { }

    public static async getAccessToken() {
        let response: any;
        let token: string;

        //Create DAO
        this.userDAO = new GenericDAO(UserSchema);

        //Sift our request body
        this.requestBody = {
            email: AbstractController.metadata("request").body.email,
            password: AbstractController.metadata("request").body.password
        }

        //Does this User email exist? -> Retrieve user
        response = await this.userDAO.load({
            email: this.requestBody.email
        });

        let matches = checkHash(AbstractController.metadata("request").body.password, response.password);

        if (matches) {
            token = TokenManager.encode(
                {
                    id: response._id,
                    email: AbstractController.metadata("request").body.email,
                    username: response.username,
                    expires: () => {
                        let extraMins = 600000; // in milliseconds
                        let expirationTimestamp = Date.now() + extraMins;
                        return expirationTimestamp;
                    }
                }
            );
            response = await this.userDAO.saveOrUpdate(
                {
                    access_token: token
                }
                , response._id
            );
        }

        DatabaseManager.disconnect();

        return {
            access_token: token
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