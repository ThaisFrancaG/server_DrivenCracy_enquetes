import joi from "joi";
// const regex = /^ObjectId/;
// const regex = /{24}/;
const choiceSchema = joi.object({
  title: joi.string().required(),
  poolId: joi.string().required(),
});

export default choiceSchema;
