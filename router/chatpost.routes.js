const { createChatPost, findAllChatPosts, findChatPostById, updateChatPost, deleteChatPost } = require("../controllers/chatpost.controller")

const router = require("express").Router()

router.post("/", createChatPost)
router.get("/", findAllChatPosts)
router.get("/:id", findChatPostById)
router.put("/:id", updateChatPost)
router.delete("/:id", deleteChatPost)

module.exports = router