import { AbstractController } from "../controllers/AbstractController";
import { UserSchema } from "../schemas/UserSchema";
import { GenericDAO } from "../schemas/dao/GenericDAO";
import { DatabaseManager } from "../helpers/DatabaseManager";
import TokenManager from "../helpers/TokenManager";

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

        let matches = UserSchema.checkHash(AbstractController.metadata("request").body.password, response.password);

        if (matches) {
            token = TokenManager.encode(
                {
                    id: response._id,
                    email: AbstractController.metadata("request").body.email,
                    username: response.username,
                }
            );
            response = await this.userDAO.saveOrUpdate(
                {
                    accessToken: token
                }
                , response._id
            );
        }

        DatabaseManager.disconnect();

        return {
            accessToken: token
        };
    }
    public static async registerUser() {
        let response: Promise<any>;

        //Create DAO
        this.userDAO = new GenericDAO(UserSchema);

        //Retrieve request body
        this.requestBody = AbstractController.metadata("request").body;

        this.requestBody.password = UserSchema.hashPassword(this.requestBody.password);

        response = await this.userDAO.saveOrUpdate(this.requestBody);

        DatabaseManager.disconnect();

        return response;
    }

}