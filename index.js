const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const axios = require("axios");
app.use(bodyParser.urlencoded({ extended: true }));
//
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
//
app.post("/", (req, res) => {
  const options = {
    method: "GET",
    url: "http://universities.hipolabs.com/search?",
    params: {
      country: req.body.CName,
    },
  };
  axios
    .request(options)
    .then(function (response) {
      res.setHeader("Content-Type", "text/html");
      res.send(
        response.data.map((e) => {
          return `<h1>${e.name}</h1>`;
        })
      );
    })
    .catch(function (error) {
      console.error(error);
    });
});
//
app.listen(4000, () => console.log("listening on port 4000"));
