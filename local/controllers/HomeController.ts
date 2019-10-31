import { RestController } from "../decorators/RestController";
import { AbstractController } from "./AbstractController";
import { ContenType } from "../enum/ContentType";
import LoginService from "../services/HomeService";
import { handledSend } from "../helpers/Tools";
import { GET } from "../decorators/httpverbs/GET";
import { POST } from "../decorators/httpverbs/POST";

@RestController("/home")
export class HomeController extends AbstractController {

    constructor() {
        super();
    }

    @GET({ path:"/hello", produces: ContenType.APP_JSON })
    public async hello() {
        let response;
        response = {
            msg: "Hello World!!"
        }
        handledSend(response);
    }

    @GET({ path: "/access", produces: ContenType.APP_JSON})
    public async getAccessToken() {
        let response;
        response = await LoginService.getAccessToken();

        handledSend(response);
    }

    @POST({ path: "/new", produces: ContenType.APP_JSON})
    public async register() {
        let response;

        response = await LoginService.registerUser();

        handledSend(response);
    }
}