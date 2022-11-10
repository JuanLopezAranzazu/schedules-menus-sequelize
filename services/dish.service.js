const { models } = require("../libs/sequelize");
const boom = require("@hapi/boom");
const { Op } = require("sequelize");

class DishService {
  constructor() {}

  async findByFilter(dataForFilter) {
    const { menus, priceStart, priceEnd } = dataForFilter;
    const dishes = await models.Dish.findAll({
      where: {
        menuId: { [Op.in]: menus },
        price: {
          [Op.gte]: priceStart,
          [Op.lte]: priceEnd,
        },
      },
      include: [{ model: models.Menu, as: "menu" }],
    });
    return dishes;
  }

  async findAll() {
    const dishes = await models.Dish.findAll({
      include: [{ model: models.Menu, as: "menu" }],
    });
    return dishes;
  }

  async findOne(id) {
    const dish = await models.Dish.findOne({
      where: { id },
      include: [{ model: models.Menu, as: "menu" }],
    });
    if (!dish) throw boom.notFound(`Dish #${id} not found`);
    return dish;
  }

  async create(payload) {
    const savedDish = await models.Dish.create(payload);
    return savedDish;
  }

  async update(id, payload) {
    const dish = await this.findOne(id);
    if (!dish) throw boom.notFound(`Dish #${id} not found`);
    const updatedDish = await dish.update(payload, {
      include: [{ model: models.Menu, as: "menu" }],
    });
    return updatedDish;
  }

  async delete(id) {
    const dish = await this.findOne(id);
    if (!dish) throw boom.notFound(`Dish #${id} not found`);
    await dish.destroy();
    return id;
  }
}

module.exports = DishService;
