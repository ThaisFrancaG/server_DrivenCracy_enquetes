import db from "../db.js";
import dayjs from "dayjs";
import { ObjectId } from "mongodb";

export async function sendPool(req, res) {
  const { title, expireAt } = req.body;
  const pool = req.body;

  try {
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
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
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

export async function getPoolChoices(req, res) {
  const poolId = req.params.id;

  try {
    const poolChoices = await db
      .collection("choices")
      .find({ poolId: poolId })
      .toArray();
    if (poolChoices.length === 0) {
      return res.status(404).send("Enquete não encontrada");
    }

    return res.status(200).send(poolChoices);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export async function getPoolResults(req, res) {
  const poolId = req.params.id;
  try {
    let choices = await db
      .collection("choices")
      .find({ poolId: poolId })
      .toArray();

    let votesNumber = 0;
    let votesName = "";

    for (let i = 0; i < choices.length; i++) {
      let choiceVotes = choices[i].votes;

      if (choiceVotes > votesNumber) {
        votesNumber = choiceVotes;
        votesName = choices[i].title;
      }
    }

    const checkRepetition = await db
      .collection("choices")
      .find({ votes: votesNumber })
      .toArray();
    let result = {};
    if (checkRepetition.length === 1) {
      result = {
        title: votesName,
        votes: votesNumber,
      };
    }

    if (checkRepetition.length > 1 && checkRepetition.length < 3) {
      result = {
        title: [checkRepetition[0].title, checkRepetition[1].title],
        votes: [checkRepetition[0].votes, checkRepetition[1].votes],
      };
    }

    if (checkRepetition.length >= 3) {
      return res
        .status(207)
        .send(
          "No momento, tem mais de 2 opções com os mesmos resultados! Portanto, os resultados estão em análise e não podem ser imediatamente divulgados"
        );
    }

    const pool = await db
      .collection("pools")
      .findOne({ _id: ObjectId(poolId) });
    const poolResults = { ...pool, result };

    return res.status(200).send(poolResults);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}
