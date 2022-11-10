const express = require("express");
const dishRouter = express.Router();

const DishService = require("../services/dish.service");
const dishService = new DishService();
const validatorHandler = require("./../middleware/validatorHandler");
const {
  createDishSchema,
  updateDishSchema,
  getDishSchema,
} = require("./../schemas/dish.schema");

dishRouter.get("/", async (req, res, next) => {
  try {
    const dishes = await dishService.findAll();
    res.status(200).json(dishes);
  } catch (error) {
    next(error);
  }
});

dishRouter.get(
  "/:id",
  validatorHandler(getDishSchema, "params"),
  async (req, res, next) => {
    try {
      const { params } = req;
      const { id } = params;
      console.log(id);
      const dish = await dishService.findOne(id);
      res.status(200).json(dish);
    } catch (error) {
      next(error);
    }
  }
);

dishRouter.post(
  "/",
  validatorHandler(createDishSchema, "body"),
  async (req, res, next) => {
    try {
      const { body } = req;
      const { name, description, price, stock, menuId } = body;
      const dataForDish = {
        name,
        description,
        price,
        stock,
        menuId,
      };
      const savedDish = await dishService.create(dataForDish);
      res.status(201).json(savedDish);
    } catch (error) {
      next(error);
    }
  }
);

dishRouter.put(
  "/:id",
  validatorHandler(getDishSchema, "params"),
  validatorHandler(updateDishSchema, "body"),
  async (req, res, next) => {
    try {
      const { params, body } = req;
      const { id } = params;
      const { name, description, price, stock, menuId } = body;
      const dataForDish = {
        name,
        description,
        price,
        stock,
        menuId,
      };
      const updatedDish = await dishService.update(id, dataForDish);
      res.status(200).json(updatedDish);
    } catch (error) {
      next(error);
    }
  }
);

dishRouter.delete(
  "/:id",
  validatorHandler(getDishSchema, "params"),
  async (req, res, next) => {
    try {
      const { params } = req;
      const { id } = params;
      console.log(id);
      const dishId = await dishService.delete(id);
      res.status(204).json(dishId);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = dishRouter;
