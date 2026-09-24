import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface OrgJwtPayload {
    userId: string;
    orgId?: string;
}

export const TokenCheckWare = (req: Request, res: Response, next: NextFunction) => {
    try {
        const JWTKEY = process.env.SECRETKEY || ""
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({
                message: "Authorization token missing"
            });
        }

        const token = authHeader.split(" ")[1];

        if (!token) {
            return res.status(401).json({
                message: "Token missing"
            });
        }

        const decoded = jwt.verify(token, JWTKEY) as OrgJwtPayload;

        req.user = decoded;

        next();

    } catch (error) {
        console.log(error);
        return res.status(401).json({
            message: "Invalid or expired token"
        });
    }
}

