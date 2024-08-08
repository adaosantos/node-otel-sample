import { fastify } from "fastify";
import { pinoHttp } from "pino-http";

function getRandomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min) + min);
}

const PORT: number = parseInt(process.env.PORT || "8080");
const SERVICE_NAME =
  process.env.OTEL_SERVICE_NAME || "node-otel-restify-sample";

const app = fastify({
  logger: true,
});

app.get("/rolldice", async (req, res) => {
  req.log.info("roll!!!");
  return getRandomNumber(1, 6).toString();
});

try {
  // coloca a aplicacao para rodar na porta setada na variavel [ environment.PORT ]
  app.listen({ port: PORT }, () => {
    console.info(`O servidor esta rodando na porta: HTTP - ${PORT}`);
  });
} catch (err) {
  console.error(`Servidor nao pode ser iniciado | ${err}`);
  process.exit(2);
}
