const fastify = require('fastify')({logger : true});

const authRoutes = require("./routes/auth");

fastify.register(authRoutes, { prefix: "/auth" });

fastify.get('/', async (request, reply) => {
    return { message: "CAMS Backend Running" };
});

fastify.listen({port:3000,host:"0.0.0.0"}, (err) => {

    if (err) {
        fastify.log.error(err);
        process.exit(1);
    }
    console.log("Server running on port 3000");
})
