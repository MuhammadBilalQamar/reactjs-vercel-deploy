const express = require("express");
const router = express.Router();
const fs = require("fs");
const sectorsRoutes = require("./sectors.js");

router.use(sectorsRoutes);
module.exports = router;
