const { createMessage, findAllMessages, findMessageById, updateMessage, deleteMessage } = require("../controllers/message.controller")

const router = require("express").Router()

router.post("/", createMessage)
router.get("/", findAllMessages)
router.get("/:id", findMessageById)
router.put("/:id", updateMessage)
router.delete("/:id", deleteMessage)


module.exports = router