const express = require("express"); // 1 e
const {handlegenearateshortid} = require("../controllers/url"); // 4e
const router = express.Router(); // 2 e

router.post("/", handlegenearateshortid); // 4e

module.exports = router; // 3 e
