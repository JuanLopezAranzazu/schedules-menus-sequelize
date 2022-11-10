const { Menu, MenuSchema } = require("./menu.model");
const { Schedule, ScheduleSchema } = require("./schedule.model");
const { Dish, DishSchema } = require("./dish.model");

function models(sequelize) {
  Menu.init(MenuSchema, Menu.config(sequelize));
  Schedule.init(ScheduleSchema, Schedule.config(sequelize));
  Dish.init(DishSchema, Dish.config(sequelize));
  Menu.associate(sequelize.models);
  Schedule.associate(sequelize.models);
  Dish.associate(sequelize.models);
}

module.exports = models;
