import jwt from "jsonwebtoken";
import fs from "fs";

export default class TokenManager {
    
    public static encode({ data, expirationTime = "" }: { data: Object; expirationTime?: string | number; }) {
        return jwt.sign(data, fs.readFileSync("./private.key", 'utf8'), { algorithm: 'RS256', expiresIn: expirationTime });
    }
    public static decode(token: string) {
        return jwt.decode(token, { json: true });
    }
    public static verify(token: string) {
        return jwt.verify(token, fs.readFileSync("./public.key", 'utf8'), { algorithms: ['RS256'] });
    }
    public static expired(token: string): boolean {
        let decoded = Object(this.verify(token));
        let expired = false;

        if(Math.floor(Date.now()/1000) >= decoded.exp) {
            expired = true;
        }

        return expired;
    }
}