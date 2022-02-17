import poolSchema from "../schemas/poolSchema.js";

export function validatePool(req, res, next) {
  const pool = req.body;

  const validation = poolSchema.validate(pool);

  if (validation.error) {
    return res.sendStatus(422);
  }

  next();
}
