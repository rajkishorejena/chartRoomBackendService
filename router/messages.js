const { addMessage, getMessage } = require("../controllers/messageController");
const router = require("express").Router();

router.post("/addMsg", addMessage);
router.post("/getMsg", getMessage);

module.exports = router;
