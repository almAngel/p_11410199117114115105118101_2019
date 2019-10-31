"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function RestController(rootPath = "") {
    return function (constructor) {
        let instance = Reflect.construct(constructor, []);
        let prototype = Object.getPrototypeOf(instance);
        let methods = Object.getOwnPropertyNames(prototype);
        Reflect.defineMetadata("rootPath", rootPath, Object.getPrototypeOf(constructor.prototype));
        methods.forEach((e) => {
            if (e != "constructor") {
                var func = prototype[e];
                Reflect.apply(func, null, [rootPath]);
            }
        });
    };
}
exports.RestController = RestController;
//# sourceMappingURL=RestController.js.map