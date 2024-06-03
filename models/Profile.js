const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../shared/config');

class Profile extends Model {}
Profile.init({
  bio: DataTypes.TEXT,
}, { sequelize, modelName: 'profile' });

module.exports = Profile
