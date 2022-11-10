const Joi = require("joi");

const id = Joi.number().integer();
const name = Joi.string().min(3).max(15);
const scheduleId = Joi.number().integer().allow(null);

const createMenuSchema = Joi.object({
  name: name.required(),
  scheduleId: scheduleId,
});

const updateMenuSchema = Joi.object({
  name: name,
  scheduleId: scheduleId,
});

const getMenuSchema = Joi.object({
  id: id.required(),
});

module.exports = { createMenuSchema, updateMenuSchema, getMenuSchema };
