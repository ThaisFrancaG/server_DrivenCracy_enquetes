import { Router } from "express";
import { sendChoice, addVote } from "../controllers/choiceController.js";
import { choiceValidate } from "../middleware/choiceValidate.js";

const choiceRouter = Router();

choiceRouter.post("/choice", choiceValidate, sendChoice);
choiceRouter.post("/choice/:id/vote", addVote);

export default choiceRouter;
