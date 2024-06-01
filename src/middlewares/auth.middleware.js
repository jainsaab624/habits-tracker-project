// Passport middleware to check if user is authenticated
export const isAuthenticated = (req, res, next) => {
  if (req.session.user) {
    return next();
  } else {
    res.redirect("/users/login");
  }
};
