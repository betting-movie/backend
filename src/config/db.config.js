module.exports = {
  HOST: "localhost",
  USER: "postgres",
  // PASSWORD: process.env["PG_PASSWORD"],
  PASSWORD:"Kushwaha@971",
  DB: "betting",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
