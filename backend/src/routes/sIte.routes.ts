import { Router } from "express";
import { siteController } from "../controllers/site.controller";
import router from "next/dist/shared/lib/router/router";

const siteRouter = Router();

siteRouter.get('/', siteController.getAll);
siteRouter.get('/:id', siteController.getBySiteId);
siteRouter.post('/', siteController.createSite);
// router.patch('/:id',);
// router.delete('/:id',);

export default siteRouter;