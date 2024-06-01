import userRepository from "./user.repository.js";
import { UserModel } from "./user.schema.js";
import bcrypt from "bcrypt";

export default class userController {
  constructor() {
    this.userRepository = new userRepository();
  }

  getRegisterPage(req, res) {
    try {
      return res.render("register");
    } catch (error) {
      console.log(error);
    }
  }

  async registerUser(req, res) {
    try {
      const { name, email, password } = req.body;

      const existingUser = await UserModel.findOne({ email });
      if (existingUser) {
        return res.status(400).json({
          message: "user already exists",
        });
      }

      const hashedPassword = await bcrypt.hash(password, 12);
      const newUser = this.userRepository.signUp(name, email, hashedPassword);

      return res.status(201).redirect("/users/login");
    } catch (error) {
      console.log(error);
    }
  }

  async loginPage(req, res) {
    try {
      return res.render("login", {
        errorMessage: false,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async loginUser(req, res) {
    try {
      const { email, password } = req.body;

      const user = await UserModel.findOne({ email });
      if (!user) {
        return res.status(400).render("login", {
          errorMessage: "invalid email",
        });
      }

      const isvalidPassword = await bcrypt.compare(password, user.password);
      if (!isvalidPassword) {
        return res.status(400).render("login", {
          errorMessage: "invalid password",
        });
      }
      req.session.user = user;
      req.session.userEmail = user.email;
      req.session.userName = user.name;

      return res.redirect("/habits/gethabitpage");
    } catch (error) {
      console.log(error);
    }
  }

  async forgotPasswordPage(req, res) {
    try {
      return res.render("resetpassword", {
        errorMessage: null,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async resetPassword(req, res) {
    try {
      const email = req.body.email;
      const password = req.body.password;
      const confirmPassword = req.body.confirmpassword;

      if (password !== confirmPassword) {
        return res.status(400).render("resetpassword", {
          errorMessage: "passwords does not match",
        });
      }

      const newPassword = await this.userRepository.resetPassword(
        email,
        password
      );

      if (newPassword == "user not found") {
        return res.status(404).render("register");
      } else {
        return res.status(200).render("login",{
          errorMessage:null
        });
      }
    } catch (error) {
      console.log(err);
    }
  }

  async logout(req, res) {
    try {
      req.session.destroy((err) => {
        if (err) {
          console.log(err);
        } else {
          return res.redirect("/users/login");
        }
      });
    } catch (error) {
      console.log(error);
    }
  }
}
