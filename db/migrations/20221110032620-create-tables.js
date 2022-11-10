"use strict";

const { DISH_TABLE, DishSchema } = require("./../models/dish.model");
const { MENU_TABLE, MenuSchema } = require("./../models/menu.model");
const {
  SCHEDULE_TABLE,
  ScheduleSchema,
} = require("./../models/schedule.model");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(DISH_TABLE, DishSchema);
    await queryInterface.createTable(MENU_TABLE, MenuSchema);
    await queryInterface.createTable(SCHEDULE_TABLE, ScheduleSchema);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.drop(DISH_TABLE);
    await queryInterface.drop(MENU_TABLE);
    await queryInterface.drop(SCHEDULE_TABLE);
  },
};
