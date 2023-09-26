module.exports = {
  HOST: "leafyprofit-db.c5mje1yk5vaw.ap-south-1.rds.amazonaws.com",
  USER: "leafyprofit",
  PASSWORD: process.env["PG_PASSWORD"],
  DB: "leafyprofit",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
