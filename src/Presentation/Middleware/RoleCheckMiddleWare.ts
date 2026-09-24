import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { checkrole } from "./CheckRole.js";
import { Role } from "../../Domain/enitites/User.js";

export const RoleCheck = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.user) {
            return res.status(401).json({
                message: "Unauthorized"
            });
        }

        const result = await checkrole.execute(req.user.userId);

        if (!result.status) {
            return res.status(404).json(result);
        }

        if (result.role !== Role.Manager) {
            return res.status(403).json({
                message: "Manager access required"
            });
        }

        next();

    } catch (err) {
        console.log(err)
    }
}