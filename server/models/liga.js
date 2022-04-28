'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Liga extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Liga.belongsTo(models.Category, {foreignKey: 'CategoryId'})
      Liga.belongsTo(models.User, { foreignKey: 'authorId' })
    }
  }
  Liga.init({
    name: {
      type: DataTypes.STRING,
      allowNull :false,
      validate : {
        notEmpty: {
          args: true,
          msg: 'name cannot be empty!'
        },
        notNull: {
          args: true,
          msg: 'Name cannot be null!'
        },
      }
    },
    slug: {
      type: DataTypes.STRING,
      allowNull :false,
      validate : {
        notEmpty: {
          args: true,
          msg: 'slug cannot be empty!'
        },
        notNull: {
          args: true,
          msg: 'slug cannot be null!'
        },
      }
    },
    abbr: {
      type: DataTypes.STRING,
      allowNull :false,
      validate : {
        notEmpty: {
          args: true,
          msg: 'abbr cannot be empty!'
        },
        notNull: {
          args: true,
          msg: 'abbr cannot be null!'
        },
      }
    },
    logos: {
      type: DataTypes.STRING,
      allowNull :false,
      validate : {
        notEmpty: {
          args: true,
          msg: 'logos cannot be empty!'
        },
        notNull: {
          args: true,
          msg: 'logos cannot be null!'
        },
      }
    },
    CategoryId: DataTypes.INTEGER,
    authorId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Liga',
  });
  return Liga;
};