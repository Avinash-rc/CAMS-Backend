const policies = require("../policies/policy");

function checkPolicy(role, action) {
  if (!policies[role]) return false;

  return policies[role].includes(action);
}

module.exports = checkPolicy;