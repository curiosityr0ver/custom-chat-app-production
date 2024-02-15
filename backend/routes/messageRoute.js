const express = require("express");
const {
    allMessages,
    sendMessage,
} = require("../controller/messageController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").get((req, res) => { res.send("Testing 2"); });
router.route("/:chatId").get(protect, allMessages);
router.route("/").post(protect, sendMessage);

module.exports = router;
