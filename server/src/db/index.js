const { Pool } = require("pg");
const { DB_USER, DB_HOST, DB_PASSWORD } = require("../constants");

const pool = new Pool({
  user: DB_USER,
  host: DB_HOST,
  database: "mit_marketplace",
  password: DB_PASSWORD,
  port: 5432,
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
