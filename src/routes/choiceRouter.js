import { Router } from "express";
import { sendChoice } from "../controllers/choiceController.js";
import { choiceValidate } from "../middleware/choiceValidate.js";

const choiceRouter = Router();

choiceRouter.post("/choice", choiceValidate, sendChoice);

export default choiceRouter;
