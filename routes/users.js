const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users-controller");

/* GET users listing. */
router.get("/", usersController.index);

/* All routes for crud on users */
router.get("/users", usersController.list);

router.get("/user/:id", usersController.detail);

router.get("/user/create", usersController.create_get);
router.post("/user/create", usersController.create_post);

router.get("/user/:id/delete", usersController.delete_get);
router.post("/user/:id/delete", usersController.delete_post);

router.get("/user/:id/update", usersController.update_get);
router.post("/user/:id/update", usersController.update_post);

module.exports = router;
