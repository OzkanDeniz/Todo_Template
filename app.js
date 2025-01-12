"use strict";
/* -------------------------------------------------------
    EXPRESSJS - TODO Project with Sequelize
------------------------------------------------------- *
$ npm init -y
$ npm i express dotenv express-async-errors
$ echo PORT=8000 > .env
$ npm i sequelize sqlite3
/* ------------------------------------------------------- */

const express = require("express");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 8000;

/* ------------------------------------------------------- */
// Accept JSON data and convert to object (for API):
app.use(express.json());
// Accept form data and convert to object:
app.use(express.urlencoded({ extended: true }));

// express-async-errors: catch async-errors and send to errorHandler:
require("express-async-errors");

/* ------------------------------------------------------- */
//* Template:
//* npm i ejs
app.set("view engine", "ejs");
//* default template folder: ./views MVC MANTIĞI BURADAN GELİR!
app.set("views", "./public");

/* ------------------------------------------------------- */
//* Routes:
app.all("/", (req, res) => {
  // res.render('index.ejs')
  // res.render('index')

  res.send(`
    <p><a href="/view">Todo Template</a></p>
    <p><a href="/api">Todo RestAPI</a></p>
    `);
});

app.use("/view", require("./app/routes/todo.router.view"));
app.use("/api", require("./app/routes/todo.router.api"));

/* ------------------------------------------------------- */
const errorHandler = (err, req, res, next) => {
  const errorStatusCode = res.errorStatusCode ?? 500;

  const data = {
    error: true, // special data
    message: err.message, // error string message
    cause: err.cause, // error option cause
    // stack: err.stack, // error details
  };

  if (req.originalUrl.startsWith("/api")) {
    console.log("errorHandler worked.");
    res.status(errorStatusCode).send();
  } else {
    res.render('error', {data})
  }
};
app.use(errorHandler);
/* ------------------------------------------------------- */
app.listen(PORT, () => console.log("Running: http://127.0.0.1:" + PORT));
