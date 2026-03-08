// const fastify = require("fastify")({ logger: true });
const cors = require("@fastify/cors");

const fastify = require('fastify')({ logger: true });

const authRoutes = require("./routes/auth");
const campRoutes = require("./routes/campRoutes");
const beneficiaryRoutes = require("./routes/beneficiaryRoutes");
const aidRoutes = require("./routes/aidRoutes");

fastify.register(authRoutes, { prefix: "/auth" });
fastify.register(campRoutes, { prefix: "/camp" });
fastify.register(beneficiaryRoutes, { prefix: "/beneficiary" });
fastify.register(aidRoutes, { prefix: "/aid" });

// Enable CORS
fastify.register(cors, {
  origin: "*"
});

fastify.get('/', async (request, reply) => {
  return { message: "CAMS Backend Running" };
});

fastify.listen({ port: 3000, host: "0.0.0.0" }, (err) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }

  console.log("Server running on port 3000");
});