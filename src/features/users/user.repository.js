import { UserModel } from "./user.schema.js";
import bcrypt from "bcrypt";

export default class userRepository {
  async signUp(name, email, hashedPassword) {
    const newUser = new UserModel({
      name,
      email,
      password: hashedPassword,
    });
    newUser.save();
    return newUser;
  }

  async signIn(email, password) {
    const user = await UserModel.findOne({
      email: email,
      password: password,
    });

    return user;
  }

  async resetPassword(email, password) {
    const user = await UserModel.findOne({
      email: email,
    });

    if (!user) {
      return "user not found";
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    user.password = hashedPassword;

    await user.save();

    return user;
  }
}
