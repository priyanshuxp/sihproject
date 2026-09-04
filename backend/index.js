import app from "./src/app.js";
import config from "./src/config/env.js";

const port = config.port;

const server = app.listen(port, () => {
  console.log(`🚀 SIH Backend server running at http://localhost:${port}`);
  console.log(`📚 Swagger documentation available at http://localhost:${port}/docs`);
});

export default server;