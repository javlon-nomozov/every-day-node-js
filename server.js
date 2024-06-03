const app = require("./app");
const config = require("./shared/config");
const { sequelize } = config;

sequelize
  .sync({ alter: true, logging: false })
  .then(async () => {
    console.log("DB connected succesfully");
    app.listen(config.port, config.hostname, () => {
      console.log(
        `Server is running on http://${config.hostname}:${config.port}`
      );
    });
  })
  .catch((err) => {
    console.log("DB connection failed due to:", err);
  });
