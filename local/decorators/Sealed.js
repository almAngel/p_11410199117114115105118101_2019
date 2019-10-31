"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractController_1 = require("../controllers/AbstractController");
function Sealed() {
    let originalMethod;
    return function (target, propertyKey, descriptor) {
        originalMethod = descriptor.value;
        AbstractController_1.AbstractController.setMetadata("#" + originalMethod.name, true);
    };
}
exports.Sealed = Sealed;
//# sourceMappingURL=Sealed.js.map