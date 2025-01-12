"use strict";
/* -------------------------------------------------------
    EXPRESSJS - TODO Project with Sequelize
------------------------------------------------------- */
//* CONTROLLERS:

const Todo = require("../models/todo.model");

const PRIORITIES = {
  "-1": "low",
  0: "Normal",
  1: "High",
};

module.exports = {
  list: async (req, res) => {
    const data = await Todo.findAndCountAll();

    res.render("index", {
      todos: data.rows,
      count: data.count,
      priorities: PRIORITIES,
    });
  },

  // CRUD ->

  create: async (req, res) => {
   
    const data = await Todo.create(req.body);

    res.render('todoCreate')
  },

  read: async (req, res) => {
    const data = await Todo.findByPk(req.params.id);

    res.render("todoRead", { todo: data, priorities: PRIORITIES });
  },

  update: async (req, res) => {
    // const data = await Todo.update({ ...newData }, { ...where })
    const data = await Todo.update(req.body, { where: { id: req.params.id } });
    // upsert: kayıt varsa güncelle, yoksa ekle

    // res.status(202).send({
    //     error: false,
    //     result: data, // kaç adet güncellendi bilgisi döner.
    //     message: 'Updated',
    //     new: await Todo.findByPk(req.params.id)
    // })

    res.status(202).send({
      error: false,
      result: await Todo.findByPk(req.params.id),
      message: "Updated",
      count: data,
    });
  },

  delete: async (req, res) => {
    const data = await Todo.destroy({ where: { id: req.params.id } });

    if (data > 0) {
      // kayıt silindiyse...

      res.redirect("/view");
      
    } else {
      // silinemediyse...

      // send to ErrorHandler:
      res.errorStatusCode = 404;
      throw new Error("Can not Deleted. (Maybe Already deleted)");
    }
  },
};

/* ------------------------------------------------------- */
