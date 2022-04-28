'use strict';
const {
  Model
} = require('sequelize');
const { hashingPassword } = require('../helpers/encryptPass');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Liga, { foreignKey: 'authorId' })
    }
  }
  User.init({
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'userName cannot be empty!'
        },
        notNull: {
          args: true,
          msg: 'UserName cannot be null!'
        },
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Email cannot be empty!'
        },
        notNull: {
          args: true,
          msg: 'Email cannot be null!'
        },
        isEmail: {
          args: true,
          msg: 'Format Email Invalid!'
        }
      }
    },
    role: DataTypes.STRING,
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Password cannot be empty!'
        },
        notNull: {
          args: true,
          msg: 'Password cannot be null!'
        },
        minPasswordLength(value) {
          if (value.length < 5) {
            throw new Error("Password must be at least 5 digits long")
          }
        }
      }
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'address cannot be empty!'
        },
        notNull: {
          args: true,
          msg: 'addresd cannot be null!'
        },
      }
    }
  }, {
    sequelize,
    hooks: {
      beforeCreate(user) {
        user.password = hashingPassword(user.password)
      }
    },
    modelName: 'User',
  });
  return User;
};