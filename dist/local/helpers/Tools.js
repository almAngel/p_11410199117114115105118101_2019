"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractController_1 = require("../controllers/AbstractController");
function handledSend(arg) {
    try {
        if (!AbstractController_1.AbstractController.metadata("response").headersSent) {
            AbstractController_1.AbstractController.metadata("response").send(arg);
        }
        else {
            AbstractController_1.AbstractController.metadata("next")();
        }
    }
    catch (e) {
        Error.captureStackTrace(e, handledSend);
        throw e;
    }
}
exports.handledSend = handledSend;
//# sourceMappingURL=Tools.js.map