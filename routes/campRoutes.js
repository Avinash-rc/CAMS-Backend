const verifyToken = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

async function campRoutes(fastify, options) {

    fastify.post("/",
        {
            preHandler: [
                verifyToken,
                authorize("camp:create")
            ]
        },
        async (req, reply) => {
            reply.send({
                message: "Camp created successfully"
            });
        }
    );


    fastify.put(
        "/:id",
        {
            preHandler: [
                verifyToken,
                authorize("camp:update")
            ]
        },
        async (req, reply) => {
            // update camp
        }
    );

}

module.exports = campRoutes;