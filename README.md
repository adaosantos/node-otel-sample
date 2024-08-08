# Node OpenTelemetry Samples

- Express
- Fastify
- Restify

## Run

`pnpm install`

`pnpm build`

`OTEL_SERVICE_NAME=node-otel-restify-sample NODE_OPTIONS="--require ./dist/instrumentation.js" pnpm start`
