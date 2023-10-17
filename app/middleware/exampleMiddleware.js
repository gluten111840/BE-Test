const db = require("../models");
// const model = db.model;

exampleMiddlewareFunction = (req, res, next) => {
  if (!req.body.data) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  } 
  next();
};

const verify = {
  exampleMiddlewareFunction: exampleMiddlewareFunction,
};

module.exports = verify;
