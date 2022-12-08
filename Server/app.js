const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
// resolve cors error
const cors = require("cors");

// create our express app
const app = express();
app.use(cors());
// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// route
const routes = require("./Routes/Route");
app.use("/", routes);

//start server
app.listen(5000, () => {
  console.log("listeniing at port:5000");
});
