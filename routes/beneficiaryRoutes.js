const verifyToken = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

async function beneficiaryRoutes(fastify, options) {

  fastify.post(
    "/",
    {
      preHandler: [
        verifyToken,
        authorize("beneficiary:create")
      ]
    },
    async (req, reply) => {
      // create beneficiary logic
      reply.send({ message: "Beneficiary created" });
    }
  );

}

module.exports = beneficiaryRoutes;