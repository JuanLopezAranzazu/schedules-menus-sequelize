const { Model, DataTypes, Sequelize } = require("sequelize");
const MENU_TABLE = "menu";
const { SCHEDULE_TABLE } = require("./schedule.model");

const MenuSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
  },
  scheduleId: {
    allowNull: true,
    type: DataTypes.INTEGER,
    references: {
      model: SCHEDULE_TABLE,
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "SET NULL",
  },
};

class Menu extends Model {
  static associate(models) {
    this.belongsTo(models.Schedule, {
      foreignKey: "scheduleId",
      as: "schedule",
    });

    this.hasMany(models.Dish, {
      foreignKey: "menuId",
      as: "dishes",
    });
  }
  static config(sequelize) {
    return {
      sequelize,
      tableName: MENU_TABLE,
      modelName: "Menu",
      timestamps: false,
    };
  }
}

module.exports = { MENU_TABLE, MenuSchema, Menu };
