const User = require("../models/user");

const index = (req, res) => {
  res.render("index", { title: "Members Only", user: req.user });
};

module.exports = {
  index,
};
