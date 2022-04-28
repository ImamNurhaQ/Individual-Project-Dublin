'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MyBookmark extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      MyBookmark.belongsTo(models.Liga, { foreignKey: "ligaId" })
      MyBookmark.belongsTo(models.User, { foreignKey: "userId" })
    }
  }
  MyBookmark.init({
    userId: DataTypes.INTEGER,
    ligaId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'MyBookmark',
  });
  return MyBookmark;
};