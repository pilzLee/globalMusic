const sql = require("mssql");

const database = "globalMusic";

const MSSQL_PASSWORD = process.env.MSSQL_PASSWORD;

const config = {
  user: "sa",
  password: MSSQL_PASSWORD, // REPLACE PASSWORD
  server: "localhost",
  database,
  port: 1433,
  options: {
    enableArithAbort: true,
  },
};

const pool = new sql.ConnectionPool(config);

const mssqlCreator = async () => {
  try {
    console.log("Connecting to MSSQL localhost ......");
    await pool.connect();
    console.log(`Successfully connected to MSSQL: sa - (${database})`);
  } catch (error) {
    throw new Error("Failed to connect MSSQL : " + error);
  }
};

mssqlCreator();

module.exports = pool;
