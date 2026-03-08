const verifyToken = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

async function aidRoutes(fastify, options) {

  fastify.post(
    "/distribute",
    {
      preHandler: [
        verifyToken,
        authorize("aid:distribute")
      ]
    },
    // aid distribution login is written here
    async (req, reply) => {
      reply.send({
        message: "Aid distributed successfully",
        
      });
    }
  );

}

module.exports = aidRoutes;