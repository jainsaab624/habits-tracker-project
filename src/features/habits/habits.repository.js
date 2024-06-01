import { habitModel } from "./habits.schema.js";

export default class habitRepository {
  async addHabit(title, description, userId) {
    try {
      const habit = new habitModel({
        title: title,
        desc: description,
        user: userId,
        dates: { date: getTodayDate(), completed: "none" },
      });

      await habit.save();
      return habit;
      //   return habit;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteHabit(userId, habitId) {
    const deletedHabit = await habitModel.deleteOne({
      _id: habitId,
      user: userId,
    });
    return deletedHabit;
  }

  async updateHabit(newTitle, newDescription, habitId, userId) {
    const updatedHabit = await habitModel.findByIdAndUpdate(
      {
        _id: habitId,
        user: userId,
      },
      {
        title: newTitle,
        desc: newDescription,
      },
      {
        new: true,
      }
    );

    await updatedHabit.save()
    return updatedHabit
  }
}

// this fucntion will return the current date, which will helpful for getting the range of dates
function getTodayDate() {
  var today = new Date();
  let date = today.getDate();
  let month = today.getMonth() + 1;

  let fullDate = month + " " + date;
  return fullDate;
}
