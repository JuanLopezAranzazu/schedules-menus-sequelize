const express = require("express");
const app = express();
const { config } = require("./config/config");
const port = config.port;
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const routes = require("./routes/index");
routes(app);

// api tests with burned data
const arrayMenus = require("./burned_data/menus.json");
const arraySchedules = require("./burned_data/schedules.json");
const { validateInputArray } = require("./tools/validateArray");

function validateDataForMenu(dataForMenu) {
  const { name, scheduleId } = dataForMenu;
  if (typeof name !== "string") {
    throw new Error("Incorrect or missing name");
  }
  const schedule = arraySchedules.find((scheduleItem) => {
    return scheduleItem.id === scheduleId;
  });
  if (!schedule) {
    throw new Error(`Schedule #${scheduleId} not found`);
  }
  return dataForMenu;
}

function validateDataForSchedule(dataForSchedule) {
  const { days, dateStart, dateEnd } = dataForSchedule;
  const regex = /^([0-9]{4})\-([0-9]{2})\-([0-9]{2})$/;
  if (!Array.isArray(days) || !validateInputArray(days)) {
    throw new Error("Incorrect or missing days");
  }
  if (!regex.test(dateStart) || !regex.test(dateEnd)) {
    throw new Error("Incorrect or missing dateStart or dateEnd");
  }
  return dataForSchedule;
}

app.get("/menus", (req, res, next) => {
  try {
    const menusSend = arrayMenus.map((menuItem) => {
      const dataForSend = {
        ...menuItem,
        schedule: arraySchedules.find((scheduleItem) => {
          return scheduleItem.id === menuItem.scheduleId;
        }),
      };
      return dataForSend;
    });
    res.json({ data: menusSend });
  } catch (error) {
    next(error);
  }
});

app.post("/menus", (req, res, next) => {
  try {
    const { body } = req;
    const payload = validateDataForMenu(body);
    const dataForMenu = {
      id:
        Math.max(
          ...arrayMenus.map((menuItem) => {
            return menuItem.id;
          })
        ) + 1,
      ...payload,
    };
    arrayMenus.push(dataForMenu);
    res.status(201).json(dataForMenu);
  } catch (error) {
    next(error);
  }
});

app.get("/schedules", (req, res, next) => {
  try {
    const schedulesSend = arraySchedules.map((scheduleItem) => {
      const dataForSend = {
        ...scheduleItem,
        menus: arrayMenus.filter((menuItem) => {
          return menuItem.scheduleId === scheduleItem.id;
        }),
      };
      return dataForSend;
    });
    res.json({ data: schedulesSend });
  } catch (error) {
    next(error);
  }
});

app.post("/schedules", (req, res, next) => {
  try {
    const { body } = req;
    const payload = validateDataForSchedule(body);
    const dataForSchedule = {
      id:
        Math.max(
          ...arraySchedules.map((scheduleItem) => {
            return scheduleItem.id;
          })
        ) + 1,
      ...payload,
    };
    arraySchedules.push(dataForSchedule);
    res.status(201).json(dataForSchedule);
  } catch (error) {
    next(error);
  }
});

const {
  errorHandler,
  boomErrorHandler,
  logErrors,
} = require("./middleware/errorHandler");
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Running server port ${port}`);
});
