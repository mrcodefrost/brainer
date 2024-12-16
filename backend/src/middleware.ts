import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";


export const userMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const header = req.headers["authorization"];
    const decoded = jwt.verify(header!, process.env.JWT_PASSWORD!);

    if(decoded) {

        // Todo : override the types of the express request object
        // @ts-ignore
        req.userId = decoded.id;
    }

}