const { models } = require("../libs/sequelize");
const boom = require("@hapi/boom");
const { Op } = require("sequelize");

const weekday = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

class MenuService {
  constructor() {}

  async findBySchedule() {
    const date = new Date();
    const day = date.getDay();
    console.log(weekday[day], date.toLocaleDateString());
    const menus = await models.Menu.findAll({
      include: [
        {
          model: models.Schedule,
          as: "schedule",
          where: {
            days: { [Op.contains]: [day] },
            dateStart: {
              [Op.lte]: date,
            },
            dateEnd: {
              [Op.gte]: date,
            },
          },
        },
        {
          model: models.Dish,
          as: "dishes",
        },
      ],
    });
    return menus;
  }

  async findAll() {
    const menus = await models.Menu.findAll({
      include: [
        { model: models.Schedule, as: "schedule" },
        {
          model: models.Dish,
          as: "dishes",
        },
      ],
    });
    return menus;
  }

  async findOne(id) {
    const menu = await models.Menu.findOne({
      where: { id },
      include: [
        { model: models.Schedule, as: "schedule" },
        {
          model: models.Dish,
          as: "dishes",
        },
      ],
    });
    if (!menu) throw boom.notFound(`Menu #${id} not found`);
    return menu;
  }

  async create(payload) {
    const savedMenu = await models.Menu.create(payload);
    return savedMenu;
  }

  async update(id, payload) {
    const menu = await this.findOne(id);
    if (!menu) throw boom.notFound(`Menu #${id} not found`);
    const updatedMenu = await menu.update(payload, {
      include: [
        { model: models.Schedule, as: "schedule" },
        {
          model: models.Dish,
          as: "dishes",
        },
      ],
    });
    return updatedMenu;
  }

  async delete(id) {
    const menu = await this.findOne(id);
    if (!menu) throw boom.notFound(`Menu #${id} not found`);
    await menu.destroy();
    return id;
  }
}

module.exports = MenuService;
