import db from "../db.js";
import dayjs from "dayjs";

export async function sendPool(req, res) {
  const { title, expireAt } = req.body;
  console.log(title);
  console.log(expireAt);

  //primeiro, conferir se já tem outra pool com esse mesmo título
  const checkPool = await db.collection("pools").findOne({ title });

  if (!!checkPool) {
    return res
      .status(409)
      .send("Já tem uma enquete com esse nome. Tente criar outra");
  }

  if (!expireAt) {
    let currentTime = dayjs().add(30, "day").format("YYYY-MM-D hh:mm");

    const completedPool = { title, expireAt: currentTime };
    await db.collection("pools").insertOne(completedPool);
    return res.status(201).send(`Enquete ${title} foi criada!`);
  }

  await db.collection("pools").insertOne(pool);
  return res.status(201).send(`Enquete ${title} foi criada!`);
}
