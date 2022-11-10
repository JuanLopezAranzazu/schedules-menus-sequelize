const { models } = require("../libs/sequelize");
const boom = require("@hapi/boom");
const { Op } = require("sequelize");

class ScheduleService {
  constructor() {}

  async findAll() {
    const schedules = await models.Schedule.findAll({
      include: [{ model: models.Menu, as: "menu" }],
    });
    return schedules;
  }

  async findOne(id) {
    const schedule = await models.Schedule.findOne({
      where: { id },
      include: [{ model: models.Menu, as: "menu" }],
    });
    if (!schedule) throw boom.notFound(`Schedule #${id} not found`);
    return schedule;
  }

  async create(payload) {
    const savedSchedule = await models.Schedule.create(payload);
    return savedSchedule;
  }

  async update(id, payload) {
    const schedule = await this.findOne(id);
    if (!schedule) throw boom.notFound(`Schedule #${id} not found`);
    const updatedSchedule = await schedule.update(payload, {
      include: [{ model: models.Menu, as: "menu" }],
    });
    return updatedSchedule;
  }

  async delete(id) {
    const schedule = await this.findOne(id);
    if (!schedule) throw boom.notFound(`Schedule #${id} not found`);
    await schedule.destroy();
    return id;
  }
}

module.exports = ScheduleService;
