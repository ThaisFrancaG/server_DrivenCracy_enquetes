import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";

const app = express();
app.use(cors());
app.use(json());
app.use(dotenv());

console.log(process.env.PORT);

app.listen(process.env.PORT, () => {
  console.log(`Now listening on ${process.env.PORT}`);
});
