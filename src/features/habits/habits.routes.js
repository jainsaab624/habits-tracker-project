import express from "express";

import habitController from "./habits.controller.js";

export const habitRouter = express.Router();

const HabitController = new habitController();

habitRouter.get("/gethabitpage", (req, res) => {
  HabitController.getHabitPage(req, res);
});

habitRouter.post("/addnewhabit", (req, res) => {
  HabitController.addNewHabit(req, res);
});

habitRouter.get("/toggle-status", (req, res) => {
  HabitController.toggleStatus(req, res);
});

habitRouter.get("/delete-habit", (req, res) => {
  HabitController.deleteHabit(req, res);
});

habitRouter.post("/update-habit", (req, res) => {
  HabitController.updateHabit(req, res);
});

