const checkPolicy = require("../utils/checkPolicy");

function authorize(action) {
  return async function (req, reply) {

    const user = req.user;

    if (!user || !user.role) {
      return reply.code(403).send({
        error: "Access Denied: No role found"
      });
    }

    const allowed = checkPolicy(user.role, action);

    if (!allowed) {
      return reply.code(403).send({
        error: "Access Denied: Insufficient permission"
      });
    }
  };
}

module.exports = authorize;