const express = require("express");
const sectorsRoutes = express.Router();
const fs = require("fs");

const dataPath = "./Details/sectorsdata.json";

// util functions
const savesectorsData = (data) => {
  const stringifyData = JSON.stringify(data);
  fs.writeFileSync(dataPath, stringifyData);
};

const getsectorsData = () => {
  const jsonData = fs.readFileSync(dataPath);
  return JSON.parse(jsonData);
};

// reading the data
sectorsRoutes.get("/sector", (req, res) => {
  fs.readFile(dataPath, "utf8", (err, data) => {
    if (err) {
      throw err;
    }
    res.send(JSON.parse(data));
  });
});

sectorsRoutes.post("/sector/addsector", (req, res) => {
  var existsectorss = getsectorsData();

  const newsectorsId = Math.floor(100000 + Math.random() * 900000);
  req.body.id = newsectorsId;
  existsectorss[newsectorsId] = req.body;

  console.log(existsectorss);

  savesectorsData(existsectorss);
  res.send({ success: true, msg: "sector data added successfully" });
});

// Read - get all sectorss from the json file
sectorsRoutes.get("/sector/list", (req, res) => {
  const sectorss = getsectorsData();
  res.send(sectorss);
});

// Read - get a single sectors from the json file
sectorsRoutes.get("/sector/:id", (req, res) => {
  const sectorss = getsectorsData();
  const sectorsId = req.params["id"];
  const sectors = sectorss[sectorsId];
  res.send(sectors);
});

// Update - using Put method
sectorsRoutes.put("/sector/:id", (req, res) => {
  var existsectorss = getsectorsData();
  fs.readFile(
    dataPath,
    "utf8",
    (err, data) => {
      const sectorsId = req.params["id"];
      req.body.id = sectorsId;
      existsectorss[sectorsId] = req.body;

      savesectorsData(existsectorss);
      res.send(`sectors with id ${sectorsId} has been updated`);
    },
    true
  );
});

//delete - using delete method
sectorsRoutes.delete("/sector/delete/:id", (req, res) => {
  fs.readFile(
    dataPath,
    "utf8",
    (err, data) => {
      var existsectorss = getsectorsData();

      const userId = req.params["id"];
      delete existsectorss[userId];
      savesectorsData(existsectorss);
      res.send(`sectors with id ${userId} has been deleted`);
    },
    true
  );
});
module.exports = sectorsRoutes;
