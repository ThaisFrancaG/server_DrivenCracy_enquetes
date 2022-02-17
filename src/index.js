import express from "express";
import { json } from "express";
import cors from "cors";
import router from "./routes/routesIndex.js";

const app = express();
app.use(cors());
app.use(json());

app.use(router);

app.listen(process.env.PORT, () => {
  console.log(`Now listening on ${process.env.PORT}`);
});
