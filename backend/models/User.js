const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/db");
const bcrypt = require("bcrypt");

class User extends Model {
  hash(password, salt) {
    return bcrypt.hash(password, salt);
  }
}

User.init(
  {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    salt: {
      type: DataTypes.STRING,
    },
    nickName: {
      type: DataTypes.STRING,
      validate: {
        customValidator(value) {
          if (!/^([a-zA-Z0-9_'.-]){2,20}$/.test(value)) {
            throw new Error(
              "Nickname must be [2-20] characters: letters, numbers and _ - ' . are allowed"
            );
          }
        },
      },
      unique: true,
      allowNull: false,
    },
    favoriteMovies: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
    favoriteTv: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
  },
  {
    sequelize,
    modelName: "User",
  }
);

User.beforeCreate((user) => {
  return bcrypt
    .genSalt(16)
    .then((salt) => {
      user.salt = salt;
      return user.hash(user.password, salt);
    })
    .then((hash) => {
      user.password = hash;
    });
});

module.exports = User;
