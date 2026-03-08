const policies = {
  admin: [
    "user:create",
    "user:read",
    "camp:create",
    "camp:update",
    "camp:delete",
    "camp:assignStaff",
    "aid:create",
    "aid:update",
    "report:view"
  ],

  doctor: [
    "beneficiary:create",
    "beneficiary:update",
    "diagnosis:add",
    "aid:approve"
  ],

  volunteer: [
    "beneficiary:create",
    "beneficiary:update",
    "aid:distribute"
  ]
};

module.exports = policies;