import dayjs from "dayjs";
import db from "../db.js";
import { ObjectId } from "mongodb";

export async function sendChoice(req, res) {
  const { title, poolId } = req.body;
  const choice = req.body;
  try {
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

    const poolExpiration = currentPool.expireAt;
    const dateOfChoice = dayjs().format("YYYY-MM-D hh:mm");
    if (dateOfChoice > poolExpiration) {
      return res
        .status(403)
        .send("O prazo para interação nessa enquete já acabou");
    }

    const poolChoices = await db
      .collection("choices")
      .findOne({ title: title });

    if (poolChoices) {
      return res.status(409).send("Título inválido!");
    }

    await db.collection("choices").insertOne({ ...choice, votes: 0 });

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

export async function addVote(req, res) {
  const choiceId = req.params.id;

  try {
    const choice = await db
      .collection("choices")
      .findOne({ _id: ObjectId(choiceId) });
    if (!choice) {
      return res.status(404).send("Essa não é uma opção válida");
    }

    const poolId = choice.poolId;

    const choicePool = await db
      .collection("pools")
      .findOne({ _id: ObjectId(poolId) });

    if (!choicePool) {
      return res
        .status(404)
        .send("A enquete não foi encontrada. Tente novamente mais tarde");
    }
    const poolExpiration = choicePool.expireAt;
    const dateOfChoice = dayjs().format("YYYY-MM-D hh:mm");

    if (dateOfChoice > poolExpiration) {
      return res
        .status(403)
        .send("O prazo para votação nessa enquete já acabou");
    }

    await db
      .collection("choices")
      .findOneAndUpdate({ _id: ObjectId(choiceId) }, { $inc: { votes: 1 } });

    return res
      .status(201)
      .send(`Voto para "${choice.title}" enviado com sucesso`);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}
