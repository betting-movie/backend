const dbConfig = require("../config/db.config");
const Sequelize = require("sequelize");
const pg = require("pg");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  dialectModule: pg,
  operatorsAliases: "0",
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// All models related to Leafy
db.user = require("./leafy/user/user.model")(sequelize, Sequelize);

// All models related to mentorship
db.Student = require("./mentorship/student/student.model")(
  sequelize,
  Sequelize
);
db.Guide = require("./mentorship/guide/guide.model")(sequelize, Sequelize);
db.StudentGuide = require("./mentorship/student_guide/student_guide.model")(
  sequelize,
  Sequelize
);
db.College = require("./mentorship/college/college.model")(
  sequelize,
  Sequelize
);

// Studnet Guide Mapping

db.Student.belongsToMany(db.Guide, { through: db.StudentGuide });
db.Guide.belongsToMany(db.Student, { through: db.StudentGuide });
db.StudentGuide.belongsTo(db.Student);
db.StudentGuide.belongsTo(db.Guide);

module.exports = db;
