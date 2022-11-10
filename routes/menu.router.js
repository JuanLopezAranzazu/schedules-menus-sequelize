const express = require("express");
const menuRouter = express.Router();

const MenuService = require("../services/menu.service");
const menuService = new MenuService();
const validatorHandler = require("./../middleware/validatorHandler");
const {
  createMenuSchema,
  updateMenuSchema,
  getMenuSchema,
} = require("./../schemas/menu.schema");

menuRouter.get("/", async (req, res, next) => {
  try {
    const menus = await menuService.findAll();
    res.status(200).json(menus);
  } catch (error) {
    next(error);
  }
});

menuRouter.get(
  "/:id",
  validatorHandler(getMenuSchema, "params"),
  async (req, res, next) => {
    try {
      const { params } = req;
      const { id } = params;
      console.log(id);
      const menu = await menuService.findOne(id);
      res.status(200).json(menu);
    } catch (error) {
      next(error);
    }
  }
);

menuRouter.post(
  "/",
  validatorHandler(createMenuSchema, "body"),
  async (req, res, next) => {
    try {
      const { body } = req;
      const { name, scheduleId } = body;
      const dataForMenu = {
        name,
        scheduleId: scheduleId ? scheduleId : null,
      };
      const savedMenu = await menuService.create(dataForMenu);
      res.status(201).json(savedMenu);
    } catch (error) {
      next(error);
    }
  }
);

menuRouter.put(
  "/:id",
  validatorHandler(getMenuSchema, "params"),
  validatorHandler(updateMenuSchema, "body"),
  async (req, res, next) => {
    try {
      const { params, body } = req;
      const { id } = params;
      const { name, scheduleId } = body;
      const dataForMenu = {
        name,
        scheduleId: scheduleId ? scheduleId : null,
      };
      const updatedMenu = await menuService.update(id, dataForMenu);
      res.status(200).json(updatedMenu);
    } catch (error) {
      next(error);
    }
  }
);

menuRouter.delete(
  "/:id",
  validatorHandler(getMenuSchema, "params"),
  async (req, res, next) => {
    try {
      const { params } = req;
      const { id } = params;
      console.log(id);
      const menuId = await menuService.delete(id);
      res.status(204).json(menuId);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = menuRouter;
