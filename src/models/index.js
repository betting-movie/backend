const dbConfig = require("../config/db.config");
const Sequelize = require("sequelize");
const pg = require("pg");

const sequelize = new Sequelize(
  process.env.PGDATABASE, // Use PGDATABASE for the database name
  process.env.PGUSER, // Use PGUSER for the username
  process.env.PGPASSWORD, // Use PGPASSWORD for the password
  {
    host: process.env.PGHOST, // Use PGHOST for the host
    dialect: "postgres", // Specify the dialect as 'postgres'
    dialectModule: pg, // Set the dialect module to 'pg'
    operatorsAliases: "0",
    pool: {
      max: 5, // Adjust max pool size as needed
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    dialectOptions: {
      ssl: {
        require: true, // Enable SSL
        rejectUnauthorized: false, // If your certificate is self-signed, set to false; otherwise, true
      },
    },
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// All models related to Leafy
db.user = require("./leafy/user/user.model")(sequelize, Sequelize);
db.treeType = require("./leafy/treetype/tree-type.model")(sequelize, Sequelize);
db.treeReview = require("./leafy/treeReview/tree-review.model")(
  sequelize,
  Sequelize
);
db.order = require("./leafy/order/order.model")(sequelize, Sequelize);
db.cart = require("./leafy/cart/cart.model")(sequelize, Sequelize);

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

// Student Guide Mapping

db.Student.belongsToMany(db.Guide, { through: db.StudentGuide });
db.Guide.belongsToMany(db.Student, { through: db.StudentGuide });
db.StudentGuide.belongsTo(db.Student);
db.StudentGuide.belongsTo(db.Guide);

// Leafy-Profit Mapping

db.treeReview.belongsTo(db.user);
db.treeReview.belongsTo(db.treeType);
db.order.belongsTo(db.user);
db.order.belongsToMany(db.treeType, {
  through: "OrderTrees",
  foreignKey: "orderId",
});
db.cart.belongsTo(db.user);
db.cart.belongsTo(db.treeType);

module.exports = db;
