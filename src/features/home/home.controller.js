export default class homeController {
  homePage = (req, res) => {
    try {
      const userName = req.session.userName;
      return res.render("home", {
        userName,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
