import { AbstractController } from "../controllers/AbstractController";


export function handledSend(arg: any) {
    try {
        if(!AbstractController.metadata("response").headersSent) {
            AbstractController.metadata("response").send(arg);
        } else {
            AbstractController.metadata("next")();
        }
    } catch(e) {
        Error.captureStackTrace(e, handledSend);
        throw e;
    }
}