import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import cors from "cors";
import Pusher from "pusher";
import compress from "compression";
import { config } from "./config/config.js";
import Messages from "./models/dbMessages.js";

//connected to mongodb
mongoose.Promise = global.Promise;
mongoose
  .connect(config.mongoUri)
  .then(() => {
    console.info(`Sucessfully connected to the database!!`);
  })
  .catch((err) => {
    console.error(
      `Something went wrong while trying to connect to the database.Please verify the uri.`
    );
  });
mongoose.connection.on("error", () => {
  throw new Error(`Unable to connect to the database ${config.mongoUri}`);
});
const app = express();

// initilize Pusher
const pusher = new Pusher({
  appId: config.appId,
  key: config.key,
  secret: config.secret,
  cluster: config.cluster,
  useTLS: config.useTLS,
});

//console.log(pusher);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(compress());

//API Endpoints
const db = mongoose.connection;
db.once("open", () => {
  console.log("DB Connected");
  const msgCollection = db.collection("messagingmessages");
  const changeStream = msgCollection.watch();
  changeStream.on("change", (change) => {
    console.log(change);
    if (change.operationType === "insert") {
      const messageDetails = change.fullDocument;
      pusher.trigger("messages", "inserted", {
        name: messageDetails.name,
        message: messageDetails.message,
        timestamp: messageDetails.timestamp,
        received: messageDetails.received,
      });
    } else {
      console.log("Error trigerring Pusher");
    }
  });
});

app.get("/", (req, res) => res.status(200).send("Hello Web developers!"));

app.post("/messages/new", (req, res) => {
  const dbMessage = req.body;
  Messages.create(dbMessage, (err, data) => {
    if (err) res.status(500).send(err);
    else res.status(201).send(data);
  });
});

app.get("/messages/sync", (req, res) => {
  Messages.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

app.listen(config.port, (err) => {
  if (err) {
    console.error(err);
  }
  console.info(`Server started at port ${config.port}`);
});
