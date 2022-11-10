const Joi = require("joi");

const id = Joi.number().integer();
const days = Joi.array().items(Joi.number().integer().min(1).max(6)).unique();
const dateStart = Joi.string().regex(/^([0-9]{4})\-([0-9]{2})\-([0-9]{2})$/);
const dateEnd = Joi.string().regex(/^([0-9]{4})\-([0-9]{2})\-([0-9]{2})$/);

const createScheduleSchema = Joi.object({
  days: days.required(),
  dateStart: dateStart.required(),
  dateEnd: dateEnd.required(),
});

const updateScheduleSchema = Joi.object({
  days: days,
  dateStart: dateStart,
  dateEnd: dateEnd,
});

const getScheduleSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  createScheduleSchema,
  updateScheduleSchema,
  getScheduleSchema,
};
