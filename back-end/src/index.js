import mongoose from "mongoose";
import { app } from "./app.js";

const start = async () => {
  console.log("starting up.....!!!!!");

  const mongoConnectionUrl='mongodb+srv://developer:devo1234@cluster0.juo1t.mongodb.net/NLP?authSource=admin&replicaSet=atlas-enfyry-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true'

  try {
    await mongoose.connect(mongoConnectionUrl);
    console.log("Connected to mongodb");
  } catch (error) {
    console.log("error: ", error);
  }

  app.listen(3000, () => {
    console.log('Listening on port 3000!!!!');
  });

};


start()