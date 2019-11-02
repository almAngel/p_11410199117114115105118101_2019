import jwt from "jsonwebtoken";
import fs from "fs";

export default class TokenManager {

    public static encode(data: Object) {
        return jwt.sign(data, fs.readFileSync("./private.key"), { algorithm: 'HS256' });
    }
    public static decode(token: string) {
        return jwt.decode(token, { json: true });
    }
    public static verify(token: string) {
        return jwt.verify(token, fs.readFileSync("./public.key"), { algorithms: ['HS256'] });
    }
    
}