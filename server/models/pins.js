
module.exports = function(sequelize, DataTypes) {
    var Pin = sequelize.define("Pins", {
      username: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
          len: [1, 50]
        }
        },
        title: {
          type: DataTypes.STRING(50),
          allowNull: false,
          validate: {
            len: [1, 50]
          }
        },
      category: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
          len: [1, 150]
        }
      },
      coordinates: {
        type: DataTypes.JSON,
        allowNull: false,
        validate: {
          len: [0, 150]
        }
      },
      description: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
          len: [0, 150]
        }
      },  
      score: {
        type: DataTypes.INTEGER(50),
        allowNull: true,
        validate: {
          len: [0, 150]
        }
      },
      upvoters: {
        type: DataTypes.STRING(500),
        allowNull: true,
        len: [0, 150]
      },
      downvoters: {
        type: DataTypes.STRING(500),
        allowNull: true,
        len: [0, 150]
      },

      inactive: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    });
    return Pin;
  }
  