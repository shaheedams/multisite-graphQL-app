import { NextFunction, Request, Response } from "express";
import { SiteModel } from "../models/Site.model";

class SiteController {
    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await SiteModel.find().lean();
            return res.status(200).json({ message: "Success", data });
        } catch (error) {
            next(error);
        }
    }

    async createSite(req: Request, res: Response, next: NextFunction) {
        try {
            if (req?.body) {
                const data = await SiteModel.create({ ...req?.body });
                return res.status(200).json({ message: "Success", data });
            }
            return res.status(400).json({ message: "No content is found to create data" });
        } catch (error) {
            next(error);
        }
    }

    async getBySiteId(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            if (!id) {
                return res.status(404).json({ message: "Id not found" });
            }

            const data = await SiteModel.findOne({ siteId: id });
            return res.status(200).json({ message: "Success", data });
        } catch (error) {
            next(error);
        }
    }
}

export const siteController = new SiteController();