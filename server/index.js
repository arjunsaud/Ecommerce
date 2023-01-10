import app from "./src/config/express.js";
import {PORT}  from "./src/config/variables.js";
import {MongoConnection} from "./src/config/dbcon.js"

(async () => {
  app.listen(PORT, () => {
    console.log("Server Listening at PORT ", PORT);
  });
  try {
    const connection = new MongoConnection();
    await connection.connectToDb();
    console.log("Database Connected");
  } catch (err) {
    console.log("Error Occured While Connecting");
    console.log(err);
  }
})();
