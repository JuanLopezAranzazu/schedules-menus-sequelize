const menuRouter = require("./menu.router");
const scheduleRouter = require("./schedule.router");
const dishRouter = require("./dish.router");

function routes(app) {
  app.use("/api/v1/menus", menuRouter);
  app.use("/api/v1/schedules", scheduleRouter);
  app.use("/api/v1/dishes", dishRouter);
}

module.exports = routes;
