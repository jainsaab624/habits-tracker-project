import habitRepository from "./habits.repository.js";
import { habitModel } from "./habits.schema.js";

export default class habitController {
  constructor() {
    this.habitRepository = new habitRepository();
  }

  async getHabitPage(req, res) {
    try {
      // const userId = req.session.user._id;
      const userName = req.session.userName;
      const user = req.session.user;
      if (user) {
        const habit = await habitModel.find({ user: user._id });

        return res.render("habits", {
          habits: habit,
          weeklyDates: getOneWeekDate(),
          userName,
        });
      } else {
        return res.render("habits", {
          userName,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  async addNewHabit(req, res) {
    try {
      const userId = req.session.user._id;
      const { title, description } = req.body;

      const habit = await habitModel
        .findOne({
          title: title,
          user: userId,
        })
        .populate();
      if (habit) {
        return res.redirect("/habits/gethabitpage");
      } else {
        const newHabit = await this.habitRepository.addHabit(
          title,
          description,
          userId
        );

        return res.redirect("/habits/gethabitpage");
      }
    } catch (error) {
      console.log(error);
      return;
    }
  }

  async toggleStatus(req, res) {
    try {
      let id = req.query.id;
      let date = req.query.date;
      const habit = await habitModel.findById(id);
      console.log(date);

      if (!habit) {
        console.log("Habit not present!");
        return res.redirect("/");
      }

      // take out the date array of the habit.
      let dates = habit.dates;
      let found = false;
      // changes the complete argument accodingly.
      dates.find((item, index) => {
        if (item.date == date) {
          if (item.complete === "y") {
            item.complete = "n";
          } else if (item.complete === "n") {
            item.complete = "x";
          } else if (item.complete === "x") {
            item.complete = "y";
          }
          found = true;
        }
      });

      if (!found) {
        dates.push({ date: date, complete: "y" });
      }
      // at last save the dates.
      habit.dates = dates;
      await habit.save();
      return res.redirect("/habits/gethabitpage");
    } catch (error) {
      console.log("Error in habitController/toggleStatus", error);
      return res.render("404", {
        title: "Not Found",
      });
    }
  }

  async updateHabit(req, res) {
    try {
      console.log(req.body)
      const newTitle = req.body.title;
      const newDescription = req.body.description;
      const habitId = req.query.id;
      const userId = req.session.user._id;

      const updatedHabit = await this.habitRepository.updateHabit(
        newTitle,
        newDescription,
        habitId,
        userId
      );

      return res.redirect("/habits/gethabitpage");
    } catch (error) {
      console.log(error);
    }
  }

  async deleteHabit(req, res) {
    try {
      const userId = req.session.user._id;
      const habitId = req.query.id;

      await this.habitRepository.deleteHabit(userId, habitId);

      return res.redirect("/habits/gethabitpage");
    } catch (error) {
      console.log(error);
    }
  }
}

// This function is for providing the 7days date, which will be displayed afte the habit is created.
function getOneWeekDate() {
  let months = [
    "",
    "Jan",
    "Feb",
    "March",
    "Apr",
    "May",
    "June",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  let dates = [];
  for (let i = 6; i >= 0; i--) {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() - i);
    let mm = currentDate.getMonth() + 1;
    mm = months[mm];
    let dd = currentDate.getDate();
    if (dd < 10) dd = "0" + dd;
    dates.push(mm + " " + dd);
  }
  return dates;
}
