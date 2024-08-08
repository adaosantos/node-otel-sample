/*app.ts*/
import express, { Express } from "express";
import { pinoHttp } from "pino-http";
import { randomUUID } from "crypto";

const PORT: number = parseInt(process.env.PORT || "8080");
const app: Express = express();

function getRandomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min) + min);
}

app.use(
  pinoHttp({
    genReqId: function (req, res) {
      const existingID = req.id ?? req.headers["x-request-id"];
      if (existingID) return existingID;
      const id = randomUUID();
      res.setHeader("X-Request-Id", id);
      return id;
    },
  })
);

app.get("/rolldice", (req, res) => {
  req.log.info("roll!!!");
  res.send(getRandomNumber(1, 6).toString());
});

app.listen(PORT, () => {
  console.log(`Listening for requests on http://localhost:${PORT}`);
});
