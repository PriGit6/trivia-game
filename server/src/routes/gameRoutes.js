const express = require("express");
const router = express.Router();
const { getAllRooms } = require("../controllers/roomController");
router.get("/health", (req, res) => res.json({ status: "ok", rooms: getAllRooms().size }));
module.exports = router;
