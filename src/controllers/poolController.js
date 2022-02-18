import db from "../db.js";
import dayjs from "dayjs";

export async function sendPool(req, res) {
  const { title, expireAt } = req.body;
  const pool = req.body;
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
    return res.status(201).send(`Enquete "${title}" foi criada!`);
  }

  await db.collection("pools").insertOne(pool);
  return res.status(201).send(`Enquete ${title} foi criada!`);
}

export async function getPool(req, res) {
  const poolList = await db.collection("pools").find().toArray();

  try {
    if (poolList.length === 0) {
      return res.status(204).send("Não tem enquetes cadastradas ainda!");
    }
    return res.status(200).send(poolList);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}
