
module.exports = function(sequelize, DataTypes) {
    var Event = sequelize.define("Event", {
      name: {
        type: DataTypes.STRING(80),
        allowNull: false,
        validate: {
          len: [1, 80]
        }
        },
        time: {
            type: DataTypes.STRING(80),
            allowNull: false,
            validate: {
                len: [1, 80]
            }
        },
        endtime: {
          type: DataTypes.STRING(80),
          allowNull: false,
          validate: {
            len: [1, 80]
          }
        },
      description: {
        type: DataTypes.STRING(500),
        allowNull: true,
        validate: {
          len: [0, 500]
        }
      },
      lineup: {
        type: DataTypes.STRING(500),
        allowNull: true,
        validate: {
          len: [0, 500]
        }
      },
      day: {
          type: DataTypes.STRING(50),
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
    return Event;
  }
  