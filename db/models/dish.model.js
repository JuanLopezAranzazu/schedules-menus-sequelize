const { Model, DataTypes, Sequelize } = require("sequelize");
const DISH_TABLE = "dish";
const { MENU_TABLE } = require("./menu.model");

const DishSchema = {
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
  description: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  price: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  stock: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
  },
  menuId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: MENU_TABLE,
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "SET NULL",
  },
};

class Dish extends Model {
  static associate(models) {
    this.belongsTo(models.Menu, {
      foreignKey: "menuId",
      as: "menu",
    });
  }
  static config(sequelize) {
    return {
      sequelize,
      tableName: DISH_TABLE,
      modelName: "Dish",
      timestamps: false,
    };
  }
}

module.exports = { DISH_TABLE, DishSchema, Dish };