const verifyToken = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

async function campRoutes(fastify, options) {

    fastify.post("/camp",
        {
            preHandler: [
                verifyToken,
                authorize("camp:create")
            ]
        },
        async (req, reply) => {
            // create camp
        }
    );


    fastify.put(
        "/camp/:id",
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