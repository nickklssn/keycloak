const errorHandler = (err, req, res, next) => {
  if (err) {
    res.clearCookie("tokenset");
    res.redirect("http://localhost:4000/login");

    next();
  } else {
    next();
  }
};

module.exports = errorHandler;
