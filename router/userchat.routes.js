const { addNewUserChat, findAllUserChats, findUserChatById, updateUserChat, deleteUserChat } = require("../controllers/userchat.controller")

const router = require("express").Router()

router.post("/", addNewUserChat)
router.get("/", findAllUserChats)
router.get("/:id", findUserChatById)
router.put("/:id", updateUserChat)
router.delete("/:id", deleteUserChat)


module.exports = router