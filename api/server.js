const express = require("express");
const recipesRouter = require("./recipes/recipes-router");

const server = express();

server.use(express.json());
server.use("/api/recipes", recipesRouter);

const date = new Date().toLocaleDateString();

server.get("/", (req, res, next) => {
  res.json(`sanity check passed ${date}`);
});

server.use((err, req, res, next) => {
  // eslint-disable-line
  res.status(500).json({
    message: err.message,
    stack: err.stack,
  });
});

module.exports = server;
