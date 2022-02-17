import joi from "joi";
const regex = /^ObjectId/;
const choiceSchema = joi.object({
  title: joi.string().required(),
  poolId: joi.string().pattern(regex).required(),
});

export default choiceSchema;
