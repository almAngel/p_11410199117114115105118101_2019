import { RestController } from "../decorators/RestController";
import { AbstractController } from "./AbstractController";
import { GET } from "../decorators/httpverbs/GET";
import { ContenType } from "../enum/ContentType";
import { handledSend } from "../helpers/Tools";

@RestController("/shop")
export class SheeController extends AbstractController {

    constructor() {
        super();
    }

    @GET({ path: "/hello", produces: ContenType.APP_JSON, sealed: true })
    public async hello() {
        let response;

        response = {
            msg: "Hello World!!"
        }

        handledSend(response);
    }
}