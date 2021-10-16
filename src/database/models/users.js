'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  users.init({
    Name: DataTypes.STRING,
    NationalId: DataTypes.STRING,
    code: DataTypes.STRING,
    PhoneNumber: DataTypes.STRING,
    email: DataTypes.STRING,
    DoB: DataTypes.DATE,
    Status: DataTypes.STRING,
    Position: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'users',
  });
  return users;
};