fastify.post(
  "/beneficiary",
  {
    preHandler: [
      verifyToken,
      authorize("beneficiary:create")
    ]
  },
  async (req, reply) => {
    // create beneficiary
  }
);