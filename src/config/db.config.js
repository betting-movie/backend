module.exports = {
  HOST: "moviebettingdb.cf65vgsnnmkm.ap-south-1.rds.amazonaws.com",
  USER: "betting",
  PASSWORD: process.env["PG_PASSWORD"],
  DB: "bettingdb",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
