import { Router } from "express";
import { validatePool } from "../middleware/validatePool.js";
import {
  sendPool,
  getPool,
  getPoolChoices,
  getPoolResults,
} from "../controllers/poolController.js";
const poolRouter = Router();

poolRouter.post("/pool", validatePool, sendPool);

poolRouter.get("/pool", getPool);

poolRouter.get("/pool/choice/:id", getPoolChoices);

poolRouter.get("/pool/:id/result", getPoolResults);

export default poolRouter;
