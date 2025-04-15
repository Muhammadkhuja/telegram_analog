const { addNewChat, findAllChats, findByIdChat, updateChat, deleteChat } = require("../controllers/chat.controller")

const router = require("express").Router()

router.post("/", addNewChat)
router.get("/", findAllChats)
router.get("/:id", findByIdChat)
router.put("/:id", updateChat)
router.delete("/:id", deleteChat)


module.exports = router