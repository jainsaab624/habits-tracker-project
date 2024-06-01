import app from "./app.js";
import { connectDB } from "./db config/db_config.js";

app.listen(process.env.PORT, () => {
  console.log(`server is listening on ${process.env.PORT} `);
  connectDB()
});
