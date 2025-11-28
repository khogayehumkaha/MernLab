const { Pool } = require('pg');

// PostgreSQL connection settings
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'PsqlCrud',     // Your DB Name
  password: 'admin',                // DB Password
  port: 5432,
});

module.exports = pool;