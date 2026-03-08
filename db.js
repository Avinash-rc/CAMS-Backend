const pg = require("pg");
const dotenv = require("dotenv");

dotenv.config()

const { Pool } = pg

// create connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
})

// test connection (optional)
// pool.connect()
//   .then(() => {
//     console.log("Connected to PostgreSQL (Neon)")
//   })
//   .catch((err) => {
//     console.error("Database connection error:", err)
//   })

module.exports = { pool }