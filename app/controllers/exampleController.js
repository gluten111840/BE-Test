const { default: axios } = require("axios");
const db = require("../models");
const { set } = require("express/lib/application");
const { ws } = require("ws");
// const Model = db.Model;
// const { Op } = require("sequelize");

exports.refactoreMe1 = (req, res) => {
  let data = db.sequelize.query(`select * from "surveys"`);

  let index = [];

  data.map((e) => {
    for(let i=0;i<10;i++) {
      index.push(e.values[i]);
    }
  });

  console.log(index);

  let totalIndex = index.reduce((a, b) => a + b, 0) / 10;

  res.status(200).send({
    statusCode: 200,
    success: true,
    data: totalIndex,
  });
};

exports.refactoreMe2 = (req, res) => {
  let survey = Survey.create({
    userId: req.body.userId,
    values: req.body.values, // [] kirim array
  });

  if(survey) {
    User.update(
      { dosurvey: true, },
      { where: { id: req.body.id }, }
    );

    console.log("success");

    res.status(201).send({
      statusCode: 201,
      message: "Survey sent successfully!",
      success: true,
      data,
    });
  } else {
    res.status(500).send({
      statusCode: 500,
      message: "Cannot post survey.",
      success: false,
    });
  }
}

exports.callmeWebSocket = async (req, res) => {
    let retrieved = await axios.get("https://livethreatmap.radware.com/api/map/attacks?limit=10");
    let data = JSON.stringify(retrieved.data);

    console.log(data);

    ws.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
    console.log("data sent");
};

exports.getData = (req, res) => {
  // do something
};
