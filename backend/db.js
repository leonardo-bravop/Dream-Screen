const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  "postgres://lghmwzgdetftbm:08b11ff37ba7c62af92faeb2c0f30d531b905e13bbaf17ca1dcb5e30de802fa3@ec2-3-209-124-113.compute-1.amazonaws.com:5432/dbh5bl1n4k5o8a",
  {
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  }
);

module.exports = sequelize;
