import type { Request, Response, NextFunction } from "express";
import { checkorgowner } from "../../Domain/usecase/CheckOrgOwner.js";

export const OrgOwnerCheck = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {

    try {

        if (!req.user?.orgId) {
            return res.status(401).json({
                message: "Organization ID not found"
            });
        }

        const result = await checkorgowner.execute(req.user.orgId);

        if (!result.status) {
            return res.status(403).json(result);
        }

        next();

    } catch (err) {

        console.log(err);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
};