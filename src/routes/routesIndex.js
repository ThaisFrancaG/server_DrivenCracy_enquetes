import { Router } from "express";
import poolRouter from "./poolRouter.js";

const router = Router();

router.use(poolRouter);

export default router;
