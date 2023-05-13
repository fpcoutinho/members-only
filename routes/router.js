const express = require("express");
const router = express.Router();
const auth_controller = require("../controllers/auth-controller");
const user_controller = require("../controllers/user-controller");
const msg_controller = require("../controllers/message-controller");

/// ------------------------------ INDEX ------------------------------ ///
router.get("/", user_controller.index);
/// ------------------------------ SIGNUP ------------------------------ ///
router.get("/sign-up", auth_controller.signup_get);
router.post("/sign-up", auth_controller.signup_post);
/// ------------------------------ LOGIN/LOGOUT ------------------------------ ///
router.get("/log-in", auth_controller.login_get);
router.post("/log-in", auth_controller.login_post);
router.get("/log-out", auth_controller.logout_get);
/// ------------------------------ BOARD ------------------------------ ///
router.get("/board", msg_controller.index);
router.post("/board", msg_controller.create_post);

module.exports = router;
