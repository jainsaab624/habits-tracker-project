import express from "express";
import dotenv from "dotenv";
dotenv.config();
import path from "path";
import ejslayout from "express-ejs-layouts";
import homeRouter from "./src/features/home/home.route.js";
import { userRouter } from "./src/features/users/user.routes.js";
import { habitRouter } from "./src/features/habits/habits.routes.js";

import expressSession from "express-session";
import MongoStore from "connect-mongo";
import { isAuthenticated } from "./src/middlewares/auth.middleware.js";


// Ensure that the mongoURI is read correctly from the environment variables
const mongoURI = process.env.MONGO_URI;

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.use(express.json());



app.use(
  expressSession({
    name: "habitTracker",
    secret: "12345",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
    store: MongoStore.create({ mongoUrl: mongoURI }), // Corrected the MongoStore configuration
  })
);


// setup view engine settings
app.set("view engine", "ejs");
app.set("views", path.join(path.resolve(), "src", "views"));

app.use(ejslayout);

app.use("/", homeRouter);

app.use("/users", userRouter);

app.use("/habits", isAuthenticated, habitRouter);

export default app;
