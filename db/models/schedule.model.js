const { Model, DataTypes, Sequelize } = require("sequelize");
const SCHEDULE_TABLE = "schedule";

const ScheduleSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  days: {
    allowNull: false,
    type: DataTypes.ARRAY(DataTypes.INTEGER),
  },
  dateStart: {
    allowNull: false,
    type: DataTypes.DATEONLY,
  },
  dateEnd: {
    allowNull: false,
    type: DataTypes.DATEONLY,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
  },
};

class Schedule extends Model {
  static associate(models) {
    this.hasMany(models.Menu, {
      foreignKey: "scheduleId",
      as: "menu",
    });
  }
  static config(sequelize) {
    return {
      sequelize,
      tableName: SCHEDULE_TABLE,
      modelName: "Schedule",
      timestamps: false,
    };
  }
}

module.exports = { SCHEDULE_TABLE, ScheduleSchema, Schedule };
