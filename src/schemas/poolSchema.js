import joi from "joi";

const poolSchema = joi.object({
  title: joi.string().required(),
  expireAt: joi.date(),
});

export default poolSchema;
