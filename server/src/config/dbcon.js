import mongoose from "mongoose";
import { URL } from "./variables.js";

mongoose.set("strictQuery", false);

class Connection {
  connectToDb() {
    throw new Error("Error");
  }
}
class MongoConnection extends Connection {
  connectToDb() {
    return new Promise((resolve, reject) => {
      mongoose.connect(URL, (err) => {
        if (err) {
          reject(err);
        }
        resolve();
      });
    });
  }
}

export {MongoConnection}
