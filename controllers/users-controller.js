const User = require("../models/user");

const index = (req, res) => {
  res.send("User Page!");
};

const detail = (req, res) => {
  res.send("User Detail!");
};

const list = (req, res) => {
  res.send("User List!");
};

const create_get = (req, res) => {
  res.send("User Create Get!");
};

const create_post = (req, res) => {
  res.send("User Create Post!");
};

const delete_get = (req, res) => {
  res.send("User Delete Get!");
};

const delete_post = (req, res) => {
  res.send("User Delete Post!");
};

const update_get = (req, res) => {
  res.send("User Update Get!");
};

const update_post = (req, res) => {
  res.send("User Update Post!");
};

module.exports = {
  index,
  detail,
  list,
  create_get,
  create_post,
  delete_get,
  delete_post,
  update_get,
  update_post,
};
