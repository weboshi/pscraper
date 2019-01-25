
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    username: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        len: [1, 50]
      }
      },
      email: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
          len: [1, 50]
        }
      },
    password: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        len: [1, 150]
      }
    },
    firstname: {
      type: DataTypes.STRING(50),
      allowNull: true,
      validate: {
        len: [0, 150]
      }
    },
    lastname: {
      type: DataTypes.STRING(50),
      allowNull: true,
      validate: {
        len: [0, 150]
      }
    },  
    description: {
      type: DataTypes.STRING(50),
      allowNull: true,
      validate: {
        len: [0, 150]
      }
    },
    pins: {
      type: DataTypes.STRING(500),
      allowNull: true,
      validate: {
        len: [0, 150]
      }
    },
    inactive: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  });
  return User;
}
