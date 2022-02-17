import dayjs from "dayjs";
import db from "../db.js";

export async function sendChoice(req, res) {
  const { title, poolId } = req.body;
  console.log(title);
  console.log(poolId);

  try {
    //primeiro, ver se o poolId em questão existe, de fato
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}
