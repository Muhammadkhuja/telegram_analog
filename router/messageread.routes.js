const { createMessageRead, findAllMessageReads, findMessageReadById, updateMessageRead, deleteMessageRead } = require("../controllers/messageread.controller")

const router = require("express").Router()

router.post("/", createMessageRead)
router.get("/", findAllMessageReads)
router.get("/:id", findMessageReadById)
router.put("/:id", updateMessageRead)
router.delete("/:id", deleteMessageRead)

module.exports = router