const config = require("./shared/config");
const app = require("./app");
app.listen(config.port, config.hostname, () => {
  console.log(`Server is running on http://${config.hostname}:${config.port}`);
});
