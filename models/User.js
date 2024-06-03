const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../shared/config");
const Profile = require("./Profile");

class User extends Model {}
User.init(
  {
    username: { type: DataTypes.STRING, unique: true, allowNull: false },
  },
  {
    sequelize,
    modelName: "user",
    // timestamps:false
  }
);

// Define the one-to-one relationship
User.hasOne(Profile, {
  foreignKey: "userId",
  as: "profile",
  onDelete: "CASCADE",
});

Profile.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
});

module.exports = User;
