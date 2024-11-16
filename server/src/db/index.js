const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "mit_marketplace",
  password: "root",
  port: 5432,
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};