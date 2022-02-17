import choiceSchema from "../schemas/choiceSchema.js";

export function choiceValidate(req, res, next) {
  const choice = req.body;

  const validation = choiceSchema.validate(choice);

  if (validation.error) {
    return res.sendStatus(422);
  }

  next();
}
