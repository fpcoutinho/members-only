const Message = require("../models/message");

const index = (req, res, next) => {
  Message.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("index", {
        title: "Mini board de Mensagens",
        messages: result,
      });
    });
};

const create_post = (req, res, next) => {
  const msg = new Message(req.body);
  msg
    .save()
    .then((result) => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = {
  index,
  create_post,
};
