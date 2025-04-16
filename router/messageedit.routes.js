const { createMessageEdit, findAllMessageEdits, findMessageEditById, updateMessageEdit, deleteMessageEdit } = require("../controllers/messageedit.controller")

const router = require("express").Router()

router.post("/", createMessageEdit)
router.get("/", findAllMessageEdits)
router.get("/:id", findMessageEditById)
router.put("/:id", updateMessageEdit)
router.delete("/:id", deleteMessageEdit)

module.exports = router