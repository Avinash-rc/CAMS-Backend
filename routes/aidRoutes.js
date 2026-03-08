const verifyToken = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

async function aidRoutes(fastify, options) {

  fastify.post(
    "/aid/distribute",
    {
      preHandler: [
        verifyToken,
        authorize("aid:distribute")
      ]
    },
    async (req, reply) => {
      // your existing distributeAid logic here
    }
  );

}

module.exports = aidRoutes;