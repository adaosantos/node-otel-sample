import { createServer, Server } from "restify";
import { pinoHttp } from "pino-http";

function getRandomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min) + min);
}

const PORT: number = parseInt(process.env.PORT || "8080");
const SERVICE_NAME =
  process.env.OTEL_SERVICE_NAME || "node-otel-restify-sample";

const app: Server = createServer({
  name: SERVICE_NAME,
  version: "1.0.0",
  dtrace: true,
});

app.use(pinoHttp());
app.get("/", function (req, res, next) {
  req.log.info("roll!!!");
  res.send(200, getRandomNumber(1, 6).toString());
  return next();
});

try {
  // coloca a aplicacao para rodar na porta setada na variavel [ environment.PORT ]
  app.listen(PORT, () => {
    console.info(`O servidor esta rodando na porta: HTTP - ${PORT}`);
  });
} catch (err) {
  console.error(`Servidor nao pode ser iniciado | ${err}`);
  process.exit(2);
}
