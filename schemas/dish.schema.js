const Joi = require("joi");

const id = Joi.number().integer();
const name = Joi.string().min(3).max(15);
const description = Joi.string().min(10);
const price = Joi.number();
const stock = Joi.number().integer().min(1);
const menuId = Joi.number().integer();

const createDishSchema = Joi.object({
  name: name.required(),
  price: price.required(),
  description: description.required(),
  stock: stock.required(),
  menuId: menuId.required(),
});

const updateDishSchema = Joi.object({
  name: name,
  price: price,
  stock: stock,
  description: description,
  menuId: menuId,
});

const getDishSchema = Joi.object({
  id: id.required(),
});

module.exports = { createDishSchema, updateDishSchema, getDishSchema };
