const jwt = require("jsonwebtoken");

module.exports = async function verifyToken(req, reply) {
    // Get the token
    const authHeader = req.headers.authorization;

    // Check if the token is present
    if (!authHeader) {
        return reply.code(401).send({ error: "Token Missing !!!" });
    }

    // Extract the token
    const token = authHeader.split(" ")[1];

    // Verify the token
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
    } catch (error) {
        return reply.code(401).send({ error: "Invalid Token !!!" });
    }
}