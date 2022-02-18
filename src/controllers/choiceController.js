import dayjs from "dayjs";
import db from "../db.js";
import { ObjectId } from "mongodb";

export async function sendChoice(req, res) {
  const { title, poolId } = req.body;
  const choice = req.body;
  try {
    //o formato do ID tem que estar correto. Se não estiver, não funciona dentro do ObjectId

    const searchId = ObjectId(poolId);
    //essa parte está certa?
    const currentPool = await db.collection("pools").findOne({ _id: searchId });

    if (!currentPool) {
      return res
        .status(404)
        .send(
          "Enquete não encontrada. Confira o id informado e o formato do mesmo"
        );
    }
    //conferir se a enquete em questào já expirou
    const poolExpiration = currentPool.expireAt;
    const dateOfChoice = dayjs().format("YYYY-MM-D hh:mm");
    if (dateOfChoice > poolExpiration) {
      return res
        .status(403)
        .send("O prazo para interação nessa enquete já acabou");
    }
    //conferir se essa opção já foi inclusa
    const poolChoices = await db
      .collection("choices")
      .findOne({ title: title });
    console.log(poolChoices);

    if (poolChoices) {
      return res.status(409).send("Título inválido!");
    }

    await db.collection("choices").insertOne(choice);

    return res
      .status(201)
      .send(
        `Opção "${title}" adicionada à enquete "${currentPool.title}" com sucesso!`
      );
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}
