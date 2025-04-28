/**
 * ISC License
 * Copyright (c) 2024 Airtribe
 */

const express = require("express");
const route = require("./routers/route");
const app = express();
const port = 3000;
const loggerMiddleware = require("./middleware/logger");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(loggerMiddleware);
app.use("/api/v1/tasks", route);

app.listen(port, (err) => {
  if (err) {
    return console.log("Something bad happened", err);
  }
  console.log(`Server is listening on ${port}`);
});

module.exports = app;
