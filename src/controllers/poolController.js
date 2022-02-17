import db from "../db.js";
import dayjs from "dayjs";

export async function sendPool(req, res) {
  const pool = req.body;

  console.log(pool);
  console.log(pool.expireAt);

  if (!pool.expireAt) {
    let currentTime = dayjs().add(30, "day").format("YYYY-MM-D hh:mm");

    const finalPool = { ...pool, expireAt: currentTime };

    console.log(finalPool);
  }

  await db.collection("pools").insertOne(pool);
  return res.status(201).send("ok!");
}
