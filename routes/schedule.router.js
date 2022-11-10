const express = require("express");
const scheduleRouter = express.Router();

const ScheduleService = require("../services/schedule.service");
const scheduleService = new ScheduleService();
const validatorHandler = require("./../middleware/validatorHandler");
const {
  createScheduleSchema,
  updateScheduleSchema,
  getScheduleSchema,
} = require("../schemas/schedule.schema");

scheduleRouter.get("/", async (req, res, next) => {
  try {
    const schedules = await scheduleService.findAll();
    res.status(200).json(schedules);
  } catch (error) {
    next(error);
  }
});

scheduleRouter.get(
  "/:id",
  validatorHandler(getScheduleSchema, "params"),
  async (req, res, next) => {
    try {
      const { params } = req;
      const { id } = params;
      console.log(id);
      const schedule = await scheduleService.findOne(id);
      res.status(200).json(schedule);
    } catch (error) {
      next(error);
    }
  }
);

scheduleRouter.post(
  "/",
  validatorHandler(createScheduleSchema, "body"),
  async (req, res, next) => {
    try {
      const { body } = req;
      const { days, dateStart, dateEnd, menuId } = body;
      const dataForSchedule = {
        days,
        dateStart,
        dateEnd,
        menuId,
      };
      const savedSchedule = await scheduleService.create(dataForSchedule);
      res.status(201).json(savedSchedule);
    } catch (error) {
      next(error);
    }
  }
);

scheduleRouter.put(
  "/:id",
  validatorHandler(getScheduleSchema, "params"),
  validatorHandler(updateScheduleSchema, "body"),
  async (req, res, next) => {
    try {
      const { params, body } = req;
      const { id } = params;
      const { days, dateStart, dateEnd, menuId } = body;
      const dataForSchedule = {
        days,
        dateStart,
        dateEnd,
        menuId,
      };
      const updatedSchedule = await scheduleService.update(id, dataForSchedule);
      res.status(200).json(updatedSchedule);
    } catch (error) {
      next(error);
    }
  }
);

scheduleRouter.delete(
  "/:id",
  validatorHandler(getScheduleSchema, "params"),
  async (req, res, next) => {
    try {
      const { params } = req;
      const { id } = params;
      console.log(id);
      const scheduleId = await scheduleService.delete(id);
      res.status(204).json(scheduleId);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = scheduleRouter;
