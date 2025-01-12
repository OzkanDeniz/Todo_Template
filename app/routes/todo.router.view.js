"use strict";
/* -------------------------------------------------------
    EXPRESSJS - TODO Project with Sequelize
------------------------------------------------------- */
//* ROUTERS:

const router = require("express").Router();

const todo = require("../controllers/todo.controller.view");

// //? CRUD ->
/* ------------------------------------------------------- *

router.route("/").get(todo.list).post(todo.create);

router
  .route("/:id")
  .get(todo.read)
  .put(todo.update) // Tam data güncellemesi
  .patch(todo.update) // Kısmi data güncellemesi
  .delete(todo.delete);

// Export:
/* ------------------------------------------------------- */

router.get("/", todo.list);

router.all("/create", todo.create); // post methodu sadece form da çalışır o yüzden get ile değiştiririz.

router.get("/:id", todo.read);

router.all("/:id/update", todo.update);

router.get("/:id/delete", todo.delete);

module.exports = router;
