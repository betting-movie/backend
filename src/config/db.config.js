module.exports = {
  HOST: process.env.PGHOST,//"leafyprofit-db.c5mje1yk5vaw.ap-south-1.rds.amazonaws.com",
  USER: process.env.PGUSER,
  PASSWORD: process.env.PGPASSWORD,
  DB: process.env.PGDATABASE,
  dialect: "postgres",
  port: 5432,
  ssl: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  
};
